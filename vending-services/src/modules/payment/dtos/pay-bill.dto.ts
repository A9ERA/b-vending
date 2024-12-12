import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import BaseResponse from 'src/common/dtos/base.response';
import { BillEntity } from 'src/database/entities/bill.entity';

export class PayBillPathParamDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  id: string;
}

export class PayBillRequestBodyDto {
  @IsString()
  @IsNotEmpty()
  cashId: string;
}

interface PayBillResponseBody {
  amountPaid: number;
  changeGiven: number;
  status: string;
}
export class PayBillResponse extends BaseResponse<PayBillResponseBody> {
  constructor({ amountPaid, changeGiven, status }: BillEntity) {
    super({
      amountPaid,
      changeGiven,
      status,
    });
  }
}
