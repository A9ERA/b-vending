import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { PaymentService } from './payment.service';
import {
  CreateBillRequestBodyDto,
  CreateBillResponse,
} from './dtos/create-bill.dto';
import { VoidBillPathParamDto, VoidBillResponse } from './dtos/void-bill.dto';
import {
  PayBillPathParamDto,
  PayBillRequestBodyDto,
  PayBillResponse,
} from './dtos/pay-bill.dto';
import { GetBillQueryParamDto, GetBillResponse } from './dtos/get-bill.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get()
  async getProduct(@Query() { id }: GetBillQueryParamDto) {
    return new GetBillResponse(await this.paymentService.getBillById(id));
  }

  @Post()
  async createBill(@Body() body: CreateBillRequestBodyDto) {
    return new CreateBillResponse(await this.paymentService.createBill(body));
  }

  @Patch('/pay/:id')
  async payBill(
    @Param() { id }: PayBillPathParamDto,
    @Body() body: PayBillRequestBodyDto,
  ) {
    return new PayBillResponse(await this.paymentService.payBill(id, body));
  }

  @Patch('/void/:id')
  async voidBill(@Param() { id }: VoidBillPathParamDto) {
    return new VoidBillResponse(await this.paymentService.voidBill(id));
  }
}
