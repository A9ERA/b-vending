import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import BaseResponse from 'src/common/dtos/base.response';
import { CategoryEntity } from 'src/database/entities/category.entity';


export class CreateCategoryRequestBodyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  @IsOptional()
  parentId: string;
}

interface CreateCategoryResponseBody extends Omit<CategoryEntity, 'parent'> {
  parentId: string;
}

export class CreateCategoryResponse extends BaseResponse<CreateCategoryResponseBody> {
  constructor({ parent, ...category }: CategoryEntity) {
    super({
      ...category,
      parentId: parent?.id ?? null,
    });
  }
}
