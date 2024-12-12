import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { GetCashQueryParamDto, GetCashResponse } from './dtos/get-cash.dto';
import { CashService } from './cash.service';
import {
  UpdateCashPathParamDto,
  UpdateCashRequestBodyDto,
  UpdateCashResponse,
} from './dtos/update-cash.dto';

@Controller('cash')
export class CashController {
  constructor(private readonly cashService: CashService) {}

  @Get()
  async getCash(@Query() { id }: GetCashQueryParamDto) {
    if (id) {
      return new GetCashResponse(await this.cashService.getCashById(id));
    }
    return new GetCashResponse(await this.cashService.getCashes());
  }

  @Patch(':id')
  async updateCash(
    @Param() { id }: UpdateCashPathParamDto,
    @Body() body: UpdateCashRequestBodyDto,
  ) {
    return new UpdateCashResponse(await this.cashService.updateCash(id, body));
  }
}
