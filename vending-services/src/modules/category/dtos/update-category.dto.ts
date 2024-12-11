import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import BaseResponse from 'src/common/dtos/base.response';
import { CategoryEntity } from 'src/database/entities/category.entity';


export class UpdateCategoryPathParamDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  id: string;
}

export class UpdateCategoryRequestBodyDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  @IsOptional()
  parentId: string;
}

interface UpdateCategoryResponseBody extends Omit<CategoryEntity, 'parent'> {
  parentId: string;
}

export class UpdateCategoryResponse extends BaseResponse<UpdateCategoryResponseBody> {
  constructor({ parent, ...category }: CategoryEntity) {
    super({
      ...category,
      parentId: parent?.id ?? null,
    });
  }
}
