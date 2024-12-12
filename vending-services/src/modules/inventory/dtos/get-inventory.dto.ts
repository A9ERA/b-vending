import { IsOptional, IsString, IsUUID } from 'class-validator';
import BaseResponse from 'src/common/dtos/base.response';
import { InventoryEntity } from 'src/database/entities/inventory.entity';

export class GetInventoryQueryParamDto {
  @IsString()
  @IsUUID()
  @IsOptional()
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
