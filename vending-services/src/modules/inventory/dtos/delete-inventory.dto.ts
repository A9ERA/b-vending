import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import BaseResponse from 'src/common/dtos/base.response';


export class DeleteInventoryPathParamDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The inventory ID to delete',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
  })
  id: string;
}

interface DeleteInventoryResponseBody {
  success: boolean;
}
export class DeleteInventoryResponse extends BaseResponse<
  DeleteInventoryResponseBody
> {
  constructor(result: boolean) {
    super({
      success: result
    });
  }
}