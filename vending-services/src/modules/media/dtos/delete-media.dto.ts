import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import BaseResponse from 'src/common/dtos/base.response';

export class DeleteMediaPathParamDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The media id to be deleted',
    example: 'b4a0a4c3-0b5d-4e8b-8d5c-1d6f8b4b0c4b',
  })
  id: string;
}

interface DeleteMediaResponseBody {
  success: boolean;
}
export class DeleteMediaResponse extends BaseResponse<DeleteMediaResponseBody> {
  constructor(result: boolean) {
    super({
      success: result,
    });
  }
}
