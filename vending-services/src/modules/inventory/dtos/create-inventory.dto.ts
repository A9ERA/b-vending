import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import BaseResponse from 'src/common/dtos/base.response';


export class CreateInventoryRequestBodyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  parentId: string;
}

interface CreateInventoryResponseBody {
  referenceCode: string;
}
export class CreateInventoryResponseDto extends BaseResponse<CreateInventoryResponseBody> {
  constructor(referenceCode: string) {
    super(
      {
        referenceCode,
      },
      
    );
  }
}
