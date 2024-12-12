import { IsNotEmpty, IsString } from 'class-validator';
import BaseResponse from 'src/common/dtos/base.response';


export class DeleteInventoryPathParamDto {
  @IsString()
  @IsNotEmpty()
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