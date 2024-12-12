import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';
import BaseResponse from 'src/common/dtos/base.response';
import { ProductEntity } from 'src/database/entities/product.entity';


export class CreateProductRequestBodyDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber({ maxDecimalPlaces: 0 })
  @Min(0)
  price: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  desc: string;

  @IsString()
  @IsUUID()
  @IsOptional()
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
