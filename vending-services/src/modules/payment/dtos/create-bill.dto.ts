import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';
import BaseResponse from 'src/common/dtos/base.response';
import { BillEntity } from 'src/database/entities/bill.entity';


export class CreateBillRequestBodyDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Product ID to be purchased',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
  })
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
