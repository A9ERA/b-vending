import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import BaseResponse from 'src/common/dtos/base.response';
import { CategoryEntity } from 'src/database/entities/category.entity';


export class UpdateCategoryPathParamDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Category id',
    example: 'b1f3b9e6-0f4b-4e9d-8c5b-1b5f6b1b1b1b',
  })
  id: string;
}

export class UpdateCategoryRequestBodyDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'Category name',
    example: 'Snacks',
    required: false,
  })
  name: string;

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'Parent category id',
    example: 'b1f3b9e6-0f4b-4e9d-8c5b-1b5f6b1b1b1b',
    required: false,
  })
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
