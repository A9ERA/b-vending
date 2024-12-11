import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import BaseResponse from 'src/common/dtos/base.response';
import { HttpCode } from 'src/common/enum/http';

export class CreateBillRequestBodyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  parentId: string;
}

interface CreateBillResponseBody {
  referenceCode: string;
}
export class CreateBillResponseDto extends BaseResponse<CreateBillResponseBody> {
  constructor(referenceCode: string) {
    super(
      {
        referenceCode,
      },
      HttpCode.OK,
    );
  }
}
