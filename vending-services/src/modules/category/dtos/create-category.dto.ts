import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import BaseResponse from 'src/common/dtos/base.response';
import { CategoryEntity } from 'src/database/entities/category.entity';


export class CreateCategoryRequestBodyDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Category name',
    example: 'Snacks',
  })
  name: string;

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'Parent category id',
    example: 'f4f0e0c7-0b0e-4e7e-8b7f-2b4f2c1b2b5d',
    required: false,
  })
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
