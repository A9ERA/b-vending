import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';
import BaseResponse from 'src/common/dtos/base.response';
import { ProductEntity } from 'src/database/entities/product.entity';


export class UpdateProductPathParamDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id: string;
}

export class UpdateProductRequestBodyDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title: string;

  @IsNumber({ maxDecimalPlaces: 0 })
  @Min(0)
  @IsOptional()
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

interface UpdateProductResponseBody extends Omit<ProductEntity, 'previewPic'> {
  previewPicId: string;
}

export class UpdateProductResponse extends BaseResponse<UpdateProductResponseBody> {
  constructor({ previewPic, ...product }: ProductEntity) {
    super({
      ...product,
      previewPicId: previewPic?.id ?? null,
    });
  }
}
