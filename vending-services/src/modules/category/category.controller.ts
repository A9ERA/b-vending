import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { GetCategoryQueryParamDto } from './dtos/get-category.dto';
import { CreateCategoryRequestBodyDto } from './dtos/create-category.dto';
import { UpdateCategoryPathParamDto, UpdateCategoryRequestBodyDto } from './dtos/update-category.dto';
import { DeleteCategoryPathParamDto } from './dtos/delete-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getCategory(
    @Query() query: GetCategoryQueryParamDto
	): string {
    console.log(query);
    return 'hello';
  }

  @Post()
  createCategory(
    @Body() body: CreateCategoryRequestBodyDto
  ): string {
		console.log(body);
    return 'hello';
  }

	@Patch(':id')
	updateCategory(
		@Param() param: UpdateCategoryPathParamDto,
		@Body() body: UpdateCategoryRequestBodyDto,
	): void {
		console.log('param: ', param);
		console.log('body: ', body);
		

	}

	@Delete(':id')
	deleteCategory(
		@Param() param: DeleteCategoryPathParamDto,
	): void {
		console.log('param: ', param);
	
	}

}
