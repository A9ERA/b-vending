import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import BaseResponse from 'src/common/dtos/base.response';
import { MediaEntity } from 'src/database/entities/media.entity';


export class CreateMediaRequestBodyDto {

  @IsString()
  @IsNotEmpty()
  data: string;
  
  @IsString()
  @IsNotEmpty()
  fileType: string;

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  @IsOptional()
  productId: string;
}

interface CreateMediaResponseBody extends Omit<MediaEntity, 'product'> {
  productId: string;
}

export class CreateMediaResponse extends BaseResponse<CreateMediaResponseBody> {
  constructor({ product, ...media }: MediaEntity) {
    super({
      ...media,
      productId: product?.id ?? null,
    });
  }
}

