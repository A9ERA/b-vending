import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import BaseResponse from 'src/common/dtos/base.response';
import { InventoryEntity } from 'src/database/entities/inventory.entity';

export class GetInventoryQueryParamDto {
  @IsString()
  @IsUUID()
  @IsOptional()
  @ApiProperty({
    description: 'The category ID to filter the inventory',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    required: false,
  })
  categoryId: string;
}

interface GetInventoryResponseBody {
  id: string;
  quantity: number;
  productId: string;
  categoryId: string;
}
export class GetInventoryResponse extends BaseResponse<
  GetInventoryResponseBody[]
> {
  constructor(inventories: InventoryEntity[]) {
    super(
      inventories.map(({ id, quantity, product, category }) => ({
        id,
        quantity,
        productId: product.id,
        categoryId: category?.id ?? null,
      })),
    );
  }
}
