import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import BaseResponse from 'src/common/dtos/base.response';


export class DeleteProductPathParamDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
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
