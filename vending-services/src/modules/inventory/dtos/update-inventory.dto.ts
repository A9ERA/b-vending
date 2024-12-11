import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import BaseResponse from 'src/common/dtos/base.response';
import { HttpCode } from 'src/common/enum/http';

export class UpdateInventoryPathParamDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class UpdateInventoryRequestBodyDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  parentId: string;
}

interface UpdateInventoryResponseBody {
  referenceCode: string;
}
export class UpdateInventoryResponseDto extends BaseResponse<UpdateInventoryResponseBody> {
  constructor(referenceCode: string) {
    super(
      {
        referenceCode,
      },
      HttpCode.OK,
    );
  }
}
