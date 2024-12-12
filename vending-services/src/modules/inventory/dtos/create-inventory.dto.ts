import { IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';
import BaseResponse from 'src/common/dtos/base.response';
import { InventoryEntity } from 'src/database/entities/inventory.entity';


export class CreateInventoryRequestBodyDto {

  @IsString()
  @IsUUID()
  productId: string;

  @IsNumber({ maxDecimalPlaces: 0 })
  @Min(0)
  @IsOptional()
  quantity: number;

  @IsString()
  @IsUUID()
  @IsOptional()
  categoryId: string;
}

interface CreateInventoryResponseBody extends Omit<InventoryEntity, 'product' | 'category'> {
  productId: string;
  categoryId: string;
}

export class CreateInventoryResponse extends BaseResponse<CreateInventoryResponseBody> {
  constructor({ product, category, ...inventory }: InventoryEntity) {
    super({
      ...inventory,
      productId: product?.id ?? null,
      categoryId: category?.id ?? null,
    });
  }
}
