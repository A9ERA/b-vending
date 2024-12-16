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
import { ProductService } from './product.service';
import {
  GetProductQueryParamDto,
  GetProductResponse,
} from './dtos/get-product.dto';
import {
  CreateProductRequestBodyDto,
  CreateProductResponse,
} from './dtos/create-product.dto';
import {
  UpdateProductPathParamDto,
  UpdateProductRequestBodyDto,
  UpdateProductResponse,
} from './dtos/update-product.dto';
import {
  DeleteProductPathParamDto,
  DeleteProductResponse,
} from './dtos/delete-product.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOperation({ summary: 'Get product' })
  @ApiResponse({
    status: 200,
    type: GetProductResponse,
    example: {
      data: {
        id: '1',
        title: 'Product 1',
        price: 10,
        desc: 'Product 1 description',
        previewPicId: '1',
      },
    },
  })
  async getProduct(@Query() { id }: GetProductQueryParamDto) {
    return new GetProductResponse(await this.productService.getProductById(id));
  }

  @Post()
  @ApiOperation({ summary: 'Create product' })
  @ApiResponse({
    status: 200,
    type: CreateProductResponse,
    example: {
      data: {
        id: '1',
        title: 'Product 1',
        price: 10,
        desc: 'Product 1 description',
        previewPicId: '1',
        createdAt: '2024-12-01T00:00:00Z',
        updatedAt: '2024-12-01T00:00:00Z',
        deletedAt: null,
      },
    },
  })
  async createProduct(@Body() body: CreateProductRequestBodyDto) {
    return new CreateProductResponse(
      await this.productService.createProduct(body),
    );
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update product' })
  @ApiResponse({
    status: 200,
    type: UpdateProductResponse,
    example: {
      data: {
        id: '1',
        title: 'Product 1',
        price: 10,
        desc: 'Product 1 description',
        previewPicId: '1',
        createdAt: '2024-12-01T00:00:00Z',
        updatedAt: '2024-12-01T00:00:00Z',
        deletedAt: null,
      },
    },
  })
  async updateProduct(
    @Param() { id }: UpdateProductPathParamDto,
    @Body() body: UpdateProductRequestBodyDto,
  ) {
    return new UpdateProductResponse(
      await this.productService.updateProduct(id, body),
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete product' })
  @ApiResponse({
    status: 200,
    type: DeleteProductResponse,
    example: {
      data: {
        success: true,
      },
    },
  })
  async deleteProduct(@Param() { id }: DeleteProductPathParamDto) {
    return new DeleteProductResponse(
      await this.productService.delateProduct(id),
    );
  }
}
