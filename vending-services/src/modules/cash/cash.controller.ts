import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { GetCashQueryParamDto } from './dtos/get-cash.dto';
import { CashService } from './cash.service';
import { UpdateCashPathParamDto, UpdateCashRequestBodyDto } from './dtos/update-cash.dto';

@Controller('cash')
export class CashController {
  constructor(private readonly cashService: CashService) {}

  @Get()
  getCash(
    @Query() query: GetCashQueryParamDto,
	): string {
    console.log(query);
    return 'hello';
  }

  @Patch(':id')
	updateCash(
		@Param() param: UpdateCashPathParamDto,
		@Body() body: UpdateCashRequestBodyDto,
	): void {
		console.log('param: ', param);
		console.log('body: ', body);
		

	}
}
