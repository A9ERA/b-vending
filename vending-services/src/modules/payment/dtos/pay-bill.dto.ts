import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import BaseResponse from 'src/common/dtos/base.response';
import { BillEntity } from 'src/database/entities/bill.entity';

export class PayBillPathParamDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Bill ID to pay the bill',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
  })
  id: string;
}

export class PayBillRequestBodyDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Cash ID to pay the bill',
    example: 'C0010',
  })
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
