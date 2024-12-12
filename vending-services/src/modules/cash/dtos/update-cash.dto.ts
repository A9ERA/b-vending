import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import BaseResponse from 'src/common/dtos/base.response';
import { CashEntity } from 'src/database/entities/cash.entity';



export class UpdateCashPathParamDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  id: string;
}

export class UpdateCashRequestBodyDto {
  @IsNumber({ maxDecimalPlaces: 0 })
  @Min(0)
  @IsOptional()
  quantity: number;
}

export class UpdateCashResponse extends BaseResponse<CashEntity> {
  constructor(cash: CashEntity) {
    super(cash);
  }
}
