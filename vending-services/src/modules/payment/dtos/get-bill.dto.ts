import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';
import BaseResponse from 'src/common/dtos/base.response';
import { BillEntity } from 'src/database/entities/bill.entity';

export class GetBillQueryParamDto {
  @IsString()
  @IsUUID()
  @ApiProperty({
    description: 'Bill ID to get the bill information',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
  })
  id: string;
}

interface GetBillResponseBody extends Omit<BillEntity, 'product'> {
  productId: string;
}

export class GetBillResponse extends BaseResponse<GetBillResponseBody> {
  constructor({ product, ...bill }: BillEntity) {
    super({
      ...bill,
      productId: product.id,
    });
  }
}
