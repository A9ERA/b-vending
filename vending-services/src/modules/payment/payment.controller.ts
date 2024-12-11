import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreateBillRequestBodyDto } from './dtos/create-bill.dto';
import { VoidBillPathParamDto } from './dtos/void-bill.dto';
import { PayBillPathParamDto, PayBillRequestBodyDto } from './dtos/pay-bill.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  createBill(
    @Body() body: CreateBillRequestBodyDto
  ): string {
		console.log(body);
    return 'hello';
  }

  @Patch('/pay/:id')
	payBill(
		@Param() param: PayBillPathParamDto,
    @Body() body: PayBillRequestBodyDto,
	): void {
		console.log('param: ', param);
		console.log('body: ', body);

	}

  @Patch('/void/:id')
	voidBill(
		@Param() param: VoidBillPathParamDto,
	): void {
		console.log('param: ', param);

	}
}
