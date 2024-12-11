import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { GetInventoryQueryParamDto } from './dtos/get-inventory.dto';
import { CreateInventoryRequestBodyDto } from './dtos/create-inventory.dto';
import { UpdateInventoryPathParamDto, UpdateInventoryRequestBodyDto } from './dtos/update-inventory.dto';
import { DeleteInventoryPathParamDto } from './dtos/delete-inventory.dto';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  getInventory(
    @Query() query: GetInventoryQueryParamDto
	): string {
    console.log(query);
    return 'hello';
  }

  @Post()
  createInventory(
    @Body() body: CreateInventoryRequestBodyDto
  ): string {
		console.log(body);
    return 'hello';
  }

	@Patch(':id')
	updateInventory(
		@Param() param: UpdateInventoryPathParamDto,
		@Body() body: UpdateInventoryRequestBodyDto,
	): void {
		console.log('param: ', param);
		console.log('body: ', body);
		

	}

	@Delete(':id')
	deleteInventory(
		@Param() param: DeleteInventoryPathParamDto,
	): void {
		console.log('param: ', param);
	
	}

}
