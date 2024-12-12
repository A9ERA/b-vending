import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import BaseResponse from 'src/common/dtos/base.response';
import { CashEntity } from 'src/database/entities/cash.entity';

export class GetCashQueryParamDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  id: string;
}

interface GetCashResponseBody {
  id: string;
  type: string;
  value: number;
  quantity: number;
}
export class GetCashResponse extends BaseResponse<GetCashResponseBody[]> {
  constructor(cashes: CashEntity[]) {
    super(
      cashes.map(({ id, type, value, quantity }) => ({
        id,
        type,
        value,
        quantity,
      })),
    );
  }
}
