import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';
import BaseResponse from 'src/common/dtos/base.response';
import { BillEntity } from 'src/database/entities/bill.entity';


export class CreateBillRequestBodyDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  productId: string;
}

interface CreateBillResponseBody extends Omit<BillEntity, 'product'> {
  productId: string;
}

export class CreateBillResponse extends BaseResponse<CreateBillResponseBody> {
  constructor({ product, ...bill }: BillEntity) {
    super({
      ...bill,
      productId: product.id,
    });
  }
}
