import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillEntity } from 'src/database/entities/bill.entity';
import { CashEntity } from 'src/database/entities/cash.entity';
import { ProductEntity } from 'src/database/entities/product.entity';
import { InventoryEntity } from 'src/database/entities/inventory.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BillEntity,
      CashEntity,
      ProductEntity,
      InventoryEntity,
    ]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
