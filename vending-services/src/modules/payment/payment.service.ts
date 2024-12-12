import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BillEntity } from 'src/database/entities/bill.entity';
import { Repository } from 'typeorm';
import { CreateBillRequestBodyDto } from './dtos/create-bill.dto';
import { BillStatus } from 'src/common/enum/bill-status';
import {
  PayBillPathParamDto,
  PayBillRequestBodyDto,
} from './dtos/pay-bill.dto';
import { CashEntity } from 'src/database/entities/cash.entity';
import { ProductEntity } from 'src/database/entities/product.entity';
import { VoidBillPathParamDto } from './dtos/void-bill.dto';
import { GetBillQueryParamDto } from './dtos/get-bill.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(BillEntity)
    private readonly paymentRepository: Repository<BillEntity>,
    @InjectRepository(CashEntity)
    private readonly cashRepository: Repository<CashEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async getBillById(id: GetBillQueryParamDto['id']) {
    return this.paymentRepository.findOne({
      where: { id },
      relations: ['product'],
    });
  }

  async createBill({ productId }: CreateBillRequestBodyDto) {
    const bill = this.paymentRepository.create({
      status: BillStatus.PENDING,
      product: { id: productId },
    });
    return this.paymentRepository.save(bill);
  }

  async payBill(
    id: PayBillPathParamDto['id'],
    { cashId }: PayBillRequestBodyDto,
  ) {
    const bill = await this.paymentRepository.findOne({
      where: { id },
      relations: ['product'],
    });
    if (!bill) {
      throw new NotFoundException('Bill not found');
    }
    if (bill.status !== BillStatus.PENDING) {
      throw new ConflictException('Bill is not ready for payment');
    }

    const product = await this.productRepository.findOne({
      where: { id: bill.product.id },
    });

    const cash = await this.cashRepository.findOne({ where: { id: cashId } });
    if (!cash) {
      throw new NotFoundException('Invalid cash');
    }

    bill.transactionCashLog = [
      ...bill.transactionCashLog ?? [],
      {
        cash: { id: cashId },
        insertAt: new Date(),
      },
    ];

    bill.amountPaid = bill.amountPaid + cash.value;

    if (bill.amountPaid >= product.price) {
      bill.status = BillStatus.COMPLETED;
      if (bill.amountPaid > product.price) {
        bill.changeGiven = bill.amountPaid - product.price;
      }
    }

    if (bill.changeGiven > 0) {
      try {
        await this.giveChange(bill.changeGiven);
      } catch (e) {
        if (e instanceof ConflictException && e.message === 'Insufficient change') {
          bill.status = BillStatus.FAILED;
          // This is the section that needs to call the coin or banknote dispenser to return the cash
          // await dispenser.returnCash(bill.transactionCashLog); // This is a pseudo code
        }
      }
    }

    if (bill.status === BillStatus.COMPLETED) {
      await this.fillCashByCompletedBill(bill);
    }
    

    return this.paymentRepository.save(bill);
  }

  async voidBill(id: VoidBillPathParamDto['id']) {
    const bill = await this.paymentRepository.findOne({
      where: { id },
      relations: ['product'], 
    });
    if (!bill) {
      throw new NotFoundException('Bill not found');
    }
    if (bill.status !== BillStatus.PENDING) {
      throw new ConflictException('Bill is not ready for void');
    }

    // This is the section that needs to call the coin or banknote dispenser to return the cash
    // await dispenser.returnCash(bill.transactionCashLog); // This is a pseudo code

    bill.status = BillStatus.CANCELED;
    await this.paymentRepository.save(bill);

    return true;
  }

  async fillCashByCompletedBill(bill: BillEntity) {
    const cashes = await this.cashRepository.find();
    const cashLog = bill.transactionCashLog ?? [];

    for (const log of cashLog) {
      const cash = cashes.find((c) => c.id === log.cash.id);
      if (cash) {
        cash.quantity = cash.quantity + 1;
      }
    }

    await this.cashRepository.save(cashes);
  }

  async makeChangeList(cashes: CashEntity[], amount: number) {
    cashes.sort((a, b) => b.value - a.value);

    const change = [];
    let remainingAmount = amount;

    for (const cash of cashes) {
      let quantity = Math.floor(remainingAmount / cash.value);
      if (quantity > 0) {
        if (cash.quantity < quantity) {
          quantity = cash.quantity;
        }
        if (quantity > 0) {
          change.push({ cash: { id: cash.id }, quantity });
          remainingAmount -= quantity * cash.value;
        }
      }
    }

    if (remainingAmount > 0) {
      return 'Insufficient change';
    }
    
    return change;
  }

  async giveChange(amount: number) {
    const cashes = await this.cashRepository.find();
    cashes.sort((a, b) => b.value - a.value);

    const change = await this.makeChangeList(cashes, amount);
    if (typeof change === 'string') {
      throw new ConflictException(change);
    }

    console.log('[i] - give change to customer:', change);
    

    // This is the section that needs to call the coin or banknote dispenser to dispense the change
    // const dispenseResult = dispenser.dispense(change); // This is a pseudo code

    // if (dispenseResult !== 'success') {
    //   throw new InternalServerErrorException('Failed to dispense the change');
    // }

    for (const cash of cashes) {
      const quantity = change.find((c) => c.cash.id === cash.id)?.quantity ?? 0;
      cash.quantity = cash.quantity - quantity;
    }

    await this.cashRepository.save(cashes);
  }
}
