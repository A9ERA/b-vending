import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';
import BaseResponse from 'src/common/dtos/base.response';
import { ProductEntity } from 'src/database/entities/product.entity';


export class CreateProductRequestBodyDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The name of the product',
    example: 'Coca Cola',
  })
  title: string;

  @IsNumber({ maxDecimalPlaces: 0 })
  @Min(0)
  @ApiProperty({
    description: 'The price of the product',
    example: 50,
  })
  price: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'The description of the product',
    example: 'A cold refreshing drink',
    required: false,
  })
  desc: string;

  @IsString()
  @IsUUID()
  @IsOptional()
  @ApiProperty({
    description: 'The id of the preview picture from the media api',
    example: '8d7d4e8a-7b9b-4c3b-8d0b-9e8f1d7d4e8a',
    required: false,
  })
  previewPicId: string;
}

interface CreateProductResponseBody extends Omit<ProductEntity, 'previewPic'> {
  previewPicId: string;
}

export class CreateProductResponse extends BaseResponse<CreateProductResponseBody> {
  constructor({ previewPic, ...product }: ProductEntity) {
    super({
      ...product,
      previewPicId: previewPic?.id ?? null,
    });
  }
}
