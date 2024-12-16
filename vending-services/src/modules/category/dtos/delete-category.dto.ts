import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import BaseResponse from 'src/common/dtos/base.response';


export class DeleteCategoryPathParamDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Category id',
    example: 'f4f0e0c7-0b0e-4e7e-8b7f-2b4f2c1b2b5d',
  })
  id: string;
}

interface DeleteCategoryResponseBody {
  success: boolean;
}
export class DeleteCategoryResponse extends BaseResponse<
  DeleteCategoryResponseBody
> {
  constructor(result: boolean) {
    super({
      success: result
    });
  }
}
