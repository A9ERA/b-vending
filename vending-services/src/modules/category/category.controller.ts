import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import {
  GetCategoryQueryParamDto,
  GetCategoryResponse,
} from './dtos/get-category.dto';
import {
  CreateCategoryRequestBodyDto,
  CreateCategoryResponse,
} from './dtos/create-category.dto';
import {
  UpdateCategoryPathParamDto,
  UpdateCategoryRequestBodyDto,
	UpdateCategoryResponse,
} from './dtos/update-category.dto';
import { DeleteCategoryPathParamDto, DeleteCategoryResponse } from './dtos/delete-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getCategory(@Query() query: GetCategoryQueryParamDto) {
    if ('parentId' in query) {
      return new GetCategoryResponse(
        await this.categoryService.getSubCategories(query),
      );
    }
    return new GetCategoryResponse(await this.categoryService.getCategories());
  }

  @Post()
  async createCategory(@Body() body: CreateCategoryRequestBodyDto) {
    return new CreateCategoryResponse(
      await this.categoryService.createCategory(body),
    );
  }

  @Patch(':id')
  async updateCategory(
    @Param() { id }: UpdateCategoryPathParamDto,
    @Body() body: UpdateCategoryRequestBodyDto,
  ) {
    return new UpdateCategoryResponse(
      await this.categoryService.updateCategory(id, body),
    );
  }

  @Delete(':id')
  async deleteCategory(@Param() { id }: DeleteCategoryPathParamDto) {
    return new DeleteCategoryResponse(
      await this.categoryService.delateCategory(id),
    );
  }
}
