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
import {
  GetInventoryQueryParamDto,
  GetInventoryResponse,
} from './dtos/get-inventory.dto';
import {
  CreateInventoryRequestBodyDto,
  CreateInventoryResponse,
} from './dtos/create-inventory.dto';
import {
  UpdateInventoryPathParamDto,
  UpdateInventoryRequestBodyDto,
  UpdateInventoryResponse,
} from './dtos/update-inventory.dto';
import {
  DeleteInventoryPathParamDto,
  DeleteInventoryResponse,
} from './dtos/delete-inventory.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Inventory')
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  @ApiOperation({ summary: 'Get inventory' })
  @ApiResponse({
    status: 200,
    type: GetInventoryResponse,
    example: {
      data: [
        {
          id: '1',
          quantity: 10,
          productId: '1',
          categoryId: '1',
        },
        {
          id: '2',
          quantity: 20,
          productId: '2',
          categoryId: '1',
        },
      ],
    },
  })
  async getInventory(@Query() { categoryId }: GetInventoryQueryParamDto) {
    return new GetInventoryResponse(
      await this.inventoryService.getInventory(categoryId),
    );
  }

  @Post()
  @ApiOperation({ summary: 'Create inventory' })
  @ApiResponse({
    status: 200,
    type: CreateInventoryResponse,
    example: {
      data: {
        id: '1',
        quantity: 10,
        productId: '1',
        categoryId: '1',
        createdAt: '2024-12-01T00:00:00Z',
        updatedAt: '2024-12-01T00:00:00Z',
        deletedAt: null,
      },
    },
  })
  async createInventory(@Body() body: CreateInventoryRequestBodyDto) {
    return new CreateInventoryResponse(
      await this.inventoryService.createInventory(body),
    );
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update inventory' })
  @ApiResponse({
    status: 200,
    type: UpdateInventoryResponse,
    example: {
      data: {
        id: '1',
        quantity: 20,
        productId: '1',
        categoryId: '1',
        createdAt: '2024-12-01T00:00:00Z',
        updatedAt: '2024-12-01T00:00:00Z',
        deletedAt: null,
      },
    },
  })
  async updateInventory(
    @Param() { id }: UpdateInventoryPathParamDto,
    @Body() body: UpdateInventoryRequestBodyDto,
  ) {
    return new UpdateInventoryResponse(
      await this.inventoryService.updateInventory(id, body),
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete inventory' })
  @ApiResponse({
    status: 200,
    type: DeleteInventoryResponse,
    example: {
      data: {
        success: true,
      },
    },
  })
  async deleteInventory(@Param() { id }: DeleteInventoryPathParamDto) {
    return new DeleteInventoryResponse(
      await this.inventoryService.delateInventory(id),
    );
  }
}
