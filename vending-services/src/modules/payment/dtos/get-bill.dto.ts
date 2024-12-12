import { IsString, IsUUID } from 'class-validator';
import BaseResponse from 'src/common/dtos/base.response';
import { BillEntity } from 'src/database/entities/bill.entity';

export class GetBillQueryParamDto {
  @IsString()
  @IsUUID()
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
