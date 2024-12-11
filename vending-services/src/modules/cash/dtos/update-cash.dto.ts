import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import BaseResponse from 'src/common/dtos/base.response';
import { HttpCode } from 'src/common/enum/http';

export class UpdateCashPathParamDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class UpdateCashRequestBodyDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  parentId: string;
}

interface UpdateCashResponseBody {
  referenceCode: string;
}
export class UpdateCashResponseDto extends BaseResponse<UpdateCashResponseBody> {
  constructor(referenceCode: string) {
    super(
      {
        referenceCode,
      },
      HttpCode.OK,
    );
  }
}
