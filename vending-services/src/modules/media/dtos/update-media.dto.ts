import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import BaseResponse from 'src/common/dtos/base.response';
import { MediaEntity } from 'src/database/entities/media.entity';


export class UpdateMediaPathParamDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  id: string;
}

export class UpdateMediaRequestBodyDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  data: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  fileType: string;

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  @IsOptional()
  productId: string;
}

interface UpdateMediaResponseBody extends Omit<MediaEntity, 'product'> {
  productId: string;
}

export class UpdateMediaResponse extends BaseResponse<UpdateMediaResponseBody> {
  constructor({ product, ...media }: MediaEntity) {
    super({
      ...media,
      productId: product?.id ?? null,
    });
  }
}
