import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import BaseResponse from 'src/common/dtos/base.response';
import { CategoryEntity } from 'src/database/entities/category.entity';

export class GetCategoryPathParamDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  id: string;
}

export class GetCategoryQueryParamDto {
  @IsString()
  @IsUUID()
  @IsOptional()
  parentId: string;
}

interface GetCategoryResponseBody {
  id: string;
  name: string;
  parentId: string;
}
export class GetCategoryResponse extends BaseResponse<
  GetCategoryResponseBody
> {
  constructor({parent, ...category}: CategoryEntity) {
    super({
      id: category.id,
      name: category.name,
      parentId: parent?.id ?? null,
    });
  }
}
export class GetCategoriesResponse extends BaseResponse<
  GetCategoryResponseBody[]
> {
  constructor(categories: CategoryEntity[]) {
    super(
      categories.map((category) => ({
        id: category.id,
        name: category.name,
        parentId: category.parent?.id ?? null,
      })),
    );
  }
}
