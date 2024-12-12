import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';
import BaseResponse from 'src/common/dtos/base.response';
import { InventoryEntity } from 'src/database/entities/inventory.entity';


export class UpdateInventoryPathParamDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id: string;
}

export class UpdateInventoryRequestBodyDto {
  @IsString()
  @IsUUID()
  @IsOptional()
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

interface UpdateInventoryResponseBody extends Omit<InventoryEntity, 'product' | 'category'> {
  productId: string;
  categoryId: string;
}

export class UpdateInventoryResponse extends BaseResponse<UpdateInventoryResponseBody> {
  constructor({ product, category, ...inventory }: InventoryEntity) {
    super({
      ...inventory,
      productId: product?.id ?? null,
      categoryId: category?.id ?? null,
    });
  }
}

