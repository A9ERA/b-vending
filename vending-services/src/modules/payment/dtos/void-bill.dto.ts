import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import BaseResponse from 'src/common/dtos/base.response';
import { HttpCode } from 'src/common/enum/http';

export class VoidBillPathParamDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}

interface VoidBillResponseBody {
  referenceCode: string;
}
export class VoidBillResponseDto extends BaseResponse<VoidBillResponseBody> {
  constructor(referenceCode: string) {
    super(
      {
        referenceCode,
      },
      HttpCode.OK,
    );
  }
}
