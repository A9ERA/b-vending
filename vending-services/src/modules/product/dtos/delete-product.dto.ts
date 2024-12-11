import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import BaseResponse from 'src/common/dtos/base.response';


export class DeleteProductPathParamDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}

interface DeleteProductResponseBody {
  referenceCode: string;
}
export class DeleteProductResponseDto extends BaseResponse<DeleteProductResponseBody> {
  constructor(referenceCode: string) {
    super(
      {
        referenceCode,
      },
    );
  }
}
