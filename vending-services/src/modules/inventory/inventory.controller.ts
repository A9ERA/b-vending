import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { GetInventoryQueryParamDto, GetInventoryResponse } from './dtos/get-inventory.dto';
import {
  CreateInventoryRequestBodyDto,
  CreateInventoryResponse,
} from './dtos/create-inventory.dto';
import {
  UpdateInventoryPathParamDto,
  UpdateInventoryRequestBodyDto,
  UpdateInventoryResponse,
} from './dtos/update-inventory.dto';
import { DeleteInventoryPathParamDto, DeleteInventoryResponse } from './dtos/delete-inventory.dto';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  async getInventory(@Query() {categoryId}: GetInventoryQueryParamDto) {
    return new GetInventoryResponse(await this.inventoryService.getInventory(categoryId));
  }

  @Post()
  async createInventory(@Body() body: CreateInventoryRequestBodyDto) {
    return new CreateInventoryResponse(
      await this.inventoryService.createInventory(body),
    );
  }

  @Patch(':id')
  async updateInventory(
    @Param() { id }: UpdateInventoryPathParamDto,
    @Body() body: UpdateInventoryRequestBodyDto,
  ) {
    return new UpdateInventoryResponse(
      await this.inventoryService.updateInventory(id, body),
    );
  }

  @Delete(':id')
  async deleteInventory(@Param() { id }: DeleteInventoryPathParamDto) {
		return new DeleteInventoryResponse(
      await this.inventoryService.delateInventory(id),
    );
	}
}
