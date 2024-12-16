import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import BaseResponse from 'src/common/dtos/base.response';
import { CategoryEntity } from 'src/database/entities/category.entity';

export class GetCategoryPathParamDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Category id',
    example: 'b1f3b9e6-0f4b-4e9d-8c5b-1b5f6b1b1b1b',
  })
  id: string;
}

export class GetCategoryQueryParamDto {
  @IsString()
  @IsUUID()
  @IsOptional()
  @ApiProperty({
    description: 'Parent category id',
    example: 'b1f3b9e6-0f4b-4e9d-8c5b-1b5f6b1b1b1b',
    required: false,
  })
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
