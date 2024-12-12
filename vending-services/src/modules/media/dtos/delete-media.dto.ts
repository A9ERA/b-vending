import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import BaseResponse from 'src/common/dtos/base.response';

export class DeleteMediaPathParamDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
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
