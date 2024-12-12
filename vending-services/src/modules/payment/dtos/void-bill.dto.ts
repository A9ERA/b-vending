import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import BaseResponse from 'src/common/dtos/base.response';


export class VoidBillPathParamDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
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
