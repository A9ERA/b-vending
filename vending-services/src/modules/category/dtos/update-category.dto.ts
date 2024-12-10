import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import BaseResponse from 'src/common/dtos/base.response';
import { HttpCode } from 'src/common/enum/http';

export class UpdateCategoryPathParamDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class UpdateCategoryRequestBodyDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  parentId: string;
}

interface UpdateCategoryResponseBody {
  referenceCode: string;
}
export class UpdateCategoryResponseDto extends BaseResponse<UpdateCategoryResponseBody> {
  constructor(referenceCode: string) {
    super(
      {
        referenceCode,
      },
      HttpCode.OK,
    );
  }
}
