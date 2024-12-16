import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';
import BaseResponse from 'src/common/dtos/base.response';
import { InventoryEntity } from 'src/database/entities/inventory.entity';


export class CreateInventoryRequestBodyDto {

  @IsString()
  @IsUUID()
  @ApiProperty({
    description: 'The product ID to associate with the inventory',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
  })
  productId: string;

  @IsNumber({ maxDecimalPlaces: 0 })
  @Min(0)
  @IsOptional()
  @ApiProperty({
    description: 'The quantity of the product in the inventory, defaults to 0 if not provided',
    example: 10,
    required: false,
  })
  quantity: number;

  @IsString()
  @IsUUID()
  @IsOptional()
  @ApiProperty({
    description: 'The category ID to associate with the inventory, defaults to null if not provided',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    required: false,
  })
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
