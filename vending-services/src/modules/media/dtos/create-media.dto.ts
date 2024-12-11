import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import BaseResponse from 'src/common/dtos/base.response';


export class CreateMediaRequestBodyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  parentId: string;
}

interface CreateMediaResponseBody {
  referenceCode: string;
}
export class CreateMediaResponseDto extends BaseResponse<CreateMediaResponseBody> {
  constructor(referenceCode: string) {
    super(
      {
        referenceCode,
      },
      
    );
  }
}
