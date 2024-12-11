import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import BaseResponse from 'src/common/dtos/base.response';


export class DeleteCategoryPathParamDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
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
