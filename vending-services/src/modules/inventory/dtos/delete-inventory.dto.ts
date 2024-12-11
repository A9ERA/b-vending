import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import BaseResponse from 'src/common/dtos/base.response';


export class DeleteInventoryPathParamDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}

interface DeleteInventoryResponseBody {
  referenceCode: string;
}
export class DeleteInventoryResponseDto extends BaseResponse<DeleteInventoryResponseBody> {
  constructor(referenceCode: string) {
    super(
      {
        referenceCode,
      },
      
    );
  }
}
