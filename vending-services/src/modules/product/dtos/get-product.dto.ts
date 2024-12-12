import { IsString, IsUUID } from 'class-validator';
import BaseResponse from 'src/common/dtos/base.response';
import { ProductEntity } from 'src/database/entities/product.entity';

export class GetProductQueryParamDto {
  @IsString()
  @IsUUID()
  id: string;
}

interface GetProductResponseBody {
  id: string;
  title: string;
  price: number;
  desc: string;
  previewPicId: string;
}
export class GetProductResponse extends BaseResponse<GetProductResponseBody> {
  constructor({ id, title, price, desc, previewPic }: ProductEntity) {
    super({
      id,
      title,
      price,
      desc: desc ?? null,
      previewPicId: previewPic?.id ?? null,
    });
  }
}
