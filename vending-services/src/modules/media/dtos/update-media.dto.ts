import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import BaseResponse from 'src/common/dtos/base.response';
import { MediaEntity } from 'src/database/entities/media.entity';


export class UpdateMediaPathParamDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The media id to be updated',
    example: 'b4a0a4c3-0b5d-4e8b-8d5c-1d6f8b4b0c4b',
  })
  id: string;
}

export class UpdateMediaRequestBodyDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'Base64 encoded string of the media file, not data url',
    example: 'iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABmElEQVRIS+2UwQ3C...'
  })
  data: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'The type of the media file',
    example: 'image/png'
  })
  fileType: string;

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'The product id of the media, will be used to be a additional picture of the product',
    example: 'b4a0a4c3-0b5d-4e8b-8d5c-1d6f8b4b0c4b'
  })
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
