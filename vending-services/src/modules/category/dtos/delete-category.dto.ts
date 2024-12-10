import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import BaseResponse from 'src/common/dtos/base.response';
import { HttpCode } from 'src/common/enum/http';

export class DeleteCategoryPathParamDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}

interface DeleteCategoryResponseBody {
  referenceCode: string;
}
export class DeleteCategoryResponseDto extends BaseResponse<DeleteCategoryResponseBody> {
  constructor(referenceCode: string) {
    super(
      {
        referenceCode,
      },
      HttpCode.OK,
    );
  }
}
