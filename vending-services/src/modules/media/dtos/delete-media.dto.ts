import { IsNotEmpty, IsString } from 'class-validator';
import BaseResponse from 'src/common/dtos/base.response';


export class DeleteMediaPathParamDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}

interface DeleteMediaResponseBody {
  referenceCode: string;
}
export class DeleteMediaResponseDto extends BaseResponse<DeleteMediaResponseBody> {
  constructor(referenceCode: string) {
    super(
      {
        referenceCode,
      },
      
    );
  }
}
