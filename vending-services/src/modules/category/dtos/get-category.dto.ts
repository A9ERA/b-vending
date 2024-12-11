import { IsOptional, IsString, IsUUID } from 'class-validator';
import BaseResponse from 'src/common/dtos/base.response';
import { CategoryEntity } from 'src/database/entities/category.entity';

export class GetCategoryQueryParamDto {
  @IsString()
  @IsUUID()
  @IsOptional()
  parentId: string;
}

interface GetCategoryResponseBody {
  id: string;
  name: string;
}
export class GetCategoryResponse extends BaseResponse<
  GetCategoryResponseBody[]
> {
  constructor(categories: CategoryEntity[]) {
    super(
      categories.map((category) => ({
        id: category.id,
        name: category.name,
      })),
    );
  }
}
