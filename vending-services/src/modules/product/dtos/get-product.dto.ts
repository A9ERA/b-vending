import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';
import BaseResponse from 'src/common/dtos/base.response';
import { ProductEntity } from 'src/database/entities/product.entity';

export class GetProductQueryParamDto {
  @IsString()
  @IsUUID()
  @ApiProperty({
    description: 'The id of the product to get',
    example: '8d7d4e8a-7b9b-4c3b-8d0b-9e8f1d7d4e8a',
  })
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
