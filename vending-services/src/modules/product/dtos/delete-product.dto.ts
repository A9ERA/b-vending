import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import BaseResponse from 'src/common/dtos/base.response';


export class DeleteProductPathParamDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The id of the product to delete',
    example: '8d7d4e8a-7b9b-4c3b-8d0b-9e8f1d7d4e8a',
  })
  id: string;
}

interface DeleteProductResponseBody {
  success: boolean;
}
export class DeleteProductResponse extends BaseResponse<
  DeleteProductResponseBody
> {
  constructor(result: boolean) {
    super({
      success: result
    });
  }
}
