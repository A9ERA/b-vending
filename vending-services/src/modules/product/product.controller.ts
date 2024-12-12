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

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProduct(@Query() { id }: GetProductQueryParamDto) {
    return new GetProductResponse(await this.productService.getProductById(id));
  }

  @Post()
  async createProduct(@Body() body: CreateProductRequestBodyDto) {
    return new CreateProductResponse(
      await this.productService.createProduct(body),
    );
  }

  @Patch(':id')
  async updateProduct(
    @Param() { id }: UpdateProductPathParamDto,
    @Body() body: UpdateProductRequestBodyDto,
  ) {
    return new UpdateProductResponse(
      await this.productService.updateProduct(id, body),
    );
  }

  @Delete(':id')
  async deleteProduct(@Param() { id }: DeleteProductPathParamDto) {
    return new DeleteProductResponse(
      await this.productService.delateProduct(id),
    );
  }
}
