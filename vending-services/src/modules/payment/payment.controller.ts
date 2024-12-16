import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get()
  @ApiOperation({ summary: 'Get bills' })
  @ApiResponse({
    status: 200,
    type: GetBillResponse,
    example: {
      data: {
        id: '1',
        status: 'pending',
        amountPaid: 10,
        changeGiven: 0,
        transactionCashLog: [
          { cash: { id: 'C0010' }, insertAt: '2024-12-01T00:00:00Z' },
        ],
        createdAt: '2024-12-01T00:00:00Z',
        updatedAt: '2024-12-01T00:00:00Z',
        deletedAt: null,
      },
    },
  })
  async getProduct(@Query() { id }: GetBillQueryParamDto) {
    return new GetBillResponse(await this.paymentService.getBillById(id));
  }

  @Post()
  @ApiOperation({ summary: 'Create bill' })
  @ApiResponse({
    status: 200,
    type: CreateBillResponse,
    example: {
      data: {
        id: '1',
        status: 'pending',
        amountPaid: 0,
        changeGiven: 0,
        transactionCashLog: [],
        createdAt: '2024-12-01T00:00:00Z',
        updatedAt: '2024-12-01T00:00:00Z',
        deletedAt: null,
      },
    },
  })
  async createBill(@Body() body: CreateBillRequestBodyDto) {
    return new CreateBillResponse(await this.paymentService.createBill(body));
  }

  @Patch('/pay/:id')
  @ApiOperation({ summary: 'Pay bill' })
  @ApiResponse({
    status: 200,
    type: PayBillResponse,
    example: {
      data: {
        id: '1',
        status: 'paid',
        amountPaid: 10,
        changeGiven: 0,
        transactionCashLog: [
          { cash: { id: 'C0010' }, insertAt: '2024-12-01T00:00:00Z' },
        ],
        createdAt: '2024-12-01T00:00:00Z',
        updatedAt: '2024-12-01T00:00:00Z',
        deletedAt: null,
      },
    },
  })
  async payBill(
    @Param() { id }: PayBillPathParamDto,
    @Body() body: PayBillRequestBodyDto,
  ) {
    return new PayBillResponse(await this.paymentService.payBill(id, body));
  }

  @Patch('/void/:id')
  @ApiOperation({ summary: 'Void bill' })
  @ApiResponse({
    status: 200,
    type: VoidBillResponse,
    example: {
      data: {
        success: true,
      },
    },
  })
  async voidBill(@Param() { id }: VoidBillPathParamDto) {
    return new VoidBillResponse(await this.paymentService.voidBill(id));
  }
}
