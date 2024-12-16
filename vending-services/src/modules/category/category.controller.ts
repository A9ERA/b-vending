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
  GetCategoriesResponse,
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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get category by id' })
  @ApiResponse({ 
    status: 200, 
    type: GetCategoryResponse,
    example: {
      data: {
        id: 1,
        name: 'Snack',
        parentId: null,
      }
    }
  })
  async getCategoryById(@Param() { id }: UpdateCategoryPathParamDto) {
    return new GetCategoryResponse(await this.categoryService.getCategoryById(id));
  }

  @Get()
  @ApiOperation({ summary: 'Get Categories by parentId' })
  @ApiResponse({ 
    status: 200, 
    type: GetCategoriesResponse,
    examples: {
      'Get categories': {
        summary: 'Get categories (not provide parentId)',
        value: {
          data: [
            { id: 1, name: 'Snack', parentId: null },
            { id: 2, name: 'Drink', parentId: null },
          ],
        },
      },
      'Get categories by parentId 1': {
        summary: 'Get categories (with parentId=1)',
        value: {
          data: [
            { id: 3, name: 'Chips', parentId: 1 },
            { id: 4, name: 'Chocolate', parentId: 1 },
          ],
        },
      },
      'Get categories by parentId 2': {
        summary: 'Get categories (with parentId=2)',
        value: {
          data: [
            { id: 5, name: 'Coke', parentId: 2 },
            { id: 6, name: 'Pepsi', parentId: 2 },
          ],
        },
      },
    },
  })
  async getCategory(@Query() query: GetCategoryQueryParamDto) {
    if ('parentId' in query) {
      return new GetCategoriesResponse(
        await this.categoryService.getSubCategories(query),
      );
    }
    return new GetCategoriesResponse(await this.categoryService.getCategories());
  }

  @Post()
  @ApiOperation({ summary: 'Create category' })
  @ApiResponse({ 
    status: 200, 
    type: CreateCategoryResponse,
    example: {
      data: {
        id: 7,
        name: 'Candy',
        parentId: 1,
        createdAt: '2024-12-01T00:00:00.000Z',
        updatedAt: '2024-12-01T00:00:00.000Z',
        deletedAt: null,
      }
    }
  })
  async createCategory(@Body() body: CreateCategoryRequestBodyDto) {
    return new CreateCategoryResponse(
      await this.categoryService.createCategory(body),
    );
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update category' })
  @ApiResponse({ 
    status: 200, 
    type: UpdateCategoryResponse,
    example: {
      data: {
        id: 7,
        name: 'Candy',
        parentId: 1,
        createdAt: '2024-12-01T00:00:00.000Z',
        updatedAt: '2024-12-01T00:00:00.000Z',
        deletedAt: null,
      }
    }
  })
  async updateCategory(
    @Param() { id }: UpdateCategoryPathParamDto,
    @Body() body: UpdateCategoryRequestBodyDto,
  ) {
    return new UpdateCategoryResponse(
      await this.categoryService.updateCategory(id, body),
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete category' })
  @ApiResponse({
    status: 200,
    type: DeleteCategoryResponse,
    example: {
      data: {
        success: true,
      }
    }
  })
  async deleteCategory(@Param() { id }: DeleteCategoryPathParamDto) {
    return new DeleteCategoryResponse(
      await this.categoryService.delateCategory(id),
    );
  }
}
