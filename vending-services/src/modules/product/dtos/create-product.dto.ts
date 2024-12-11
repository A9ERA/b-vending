import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import BaseResponse from 'src/common/dtos/base.response';


export class CreateProductRequestBodyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  parentId: string;
}

interface CreateProductResponseBody {
  referenceCode: string;
}
export class CreateProductResponseDto extends BaseResponse<CreateProductResponseBody> {
  constructor(referenceCode: string) {
    super(
      {
        referenceCode,
      },
    );
  }
}
