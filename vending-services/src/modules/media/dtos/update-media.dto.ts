import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import BaseResponse from 'src/common/dtos/base.response';


export class UpdateMediaPathParamDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class UpdateMediaRequestBodyDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  parentId: string;
}

interface UpdateMediaResponseBody {
  referenceCode: string;
}
export class UpdateMediaResponseDto extends BaseResponse<UpdateMediaResponseBody> {
  constructor(referenceCode: string) {
    super(
      {
        referenceCode,
      },
      
    );
  }
}
