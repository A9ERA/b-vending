import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import BaseResponse from 'src/common/dtos/base.response';


export class UpdateProductPathParamDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class UpdateProductRequestBodyDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  parentId: string;
}

interface UpdateProductResponseBody {
  referenceCode: string;
}
export class UpdateProductResponseDto extends BaseResponse<UpdateProductResponseBody> {
  constructor(referenceCode: string) {
    super(
      {
        referenceCode,
      },
    );
  }
}
