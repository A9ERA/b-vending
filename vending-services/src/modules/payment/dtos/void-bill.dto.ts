import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import BaseResponse from 'src/common/dtos/base.response';


export class VoidBillPathParamDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Bill ID to void the bill',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
  })
  id: string;
}

interface VoidBillResponseBody {
  success: boolean;
}
export class VoidBillResponse extends BaseResponse<
  VoidBillResponseBody
> {
  constructor(result: boolean) {
    super({
      success: result
    });
  }
}
