import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { GetCashQueryParamDto, GetCashResponse } from './dtos/get-cash.dto';
import { CashService } from './cash.service';
import {
  UpdateCashPathParamDto,
  UpdateCashRequestBodyDto,
  UpdateCashResponse,
} from './dtos/update-cash.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Cash')
@Controller('cash')
export class CashController {
  constructor(private readonly cashService: CashService) {}

  @Get()
  @ApiOperation({ summary: 'Get cash' })
  @ApiResponse({
    status: 200,
    type: GetCashResponse,
    examples: {
      'Get cash': {
        summary: 'Get all cash',
        value: {
          data: [
            { id: 'C0001', type: 'coin', value: 1, quantity: 10 },
            { id: 'C0002', type: 'coin', value: 2, quantity: 10 },
          ],
        },
      },
      'Get cash by id': {
        summary: 'Get cash by id',
        value: {
          data: [{ id: 'B0050', type: 'banknote', value: 50, quantity: 10 }],
        },
      },
    },
  })
  async getCash(@Query() { id }: GetCashQueryParamDto) {
    if (id) {
      return new GetCashResponse(await this.cashService.getCashById(id));
    }
    return new GetCashResponse(await this.cashService.getCashes());
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update cash' })
  @ApiResponse({
    status: 200,
    type: UpdateCashResponse,
    example: { data: { id: 'C0001', type: 'coin', value: 1, quantity: 15 } },
  })
  async updateCash(
    @Param() { id }: UpdateCashPathParamDto,
    @Body() body: UpdateCashRequestBodyDto,
  ) {
    return new UpdateCashResponse(await this.cashService.updateCash(id, body));
  }
}
