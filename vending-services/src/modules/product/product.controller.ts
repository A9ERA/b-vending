import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { GetProductQueryParamDto } from './dtos/get-product.dto';
import { GetProductDetailsQueryParamDto } from './dtos/get-product-details.dto';
import { CreateProductRequestBodyDto } from './dtos/create-product.dto';
import { UpdateProductPathParamDto, UpdateProductRequestBodyDto } from './dtos/update-product.dto';
import { DeleteProductPathParamDto } from './dtos/delete-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getProduct(
    @Query() query: GetProductQueryParamDto
	): string {
    console.log(query);
    return 'hello';
  }

  @Get()
  getProductDetails(
    @Query() query: GetProductDetailsQueryParamDto
	): string {
    console.log(query);
    return 'hello';
  }

  @Post()
  createProduct(
    @Body() body: CreateProductRequestBodyDto
  ): string {
		console.log(body);
    return 'hello';
  }

	@Patch(':id')
	updateProduct(
		@Param() param: UpdateProductPathParamDto,
		@Body() body: UpdateProductRequestBodyDto,
	): void {
		console.log('param: ', param);
		console.log('body: ', body);
		

	}

	@Delete(':id')
	deleteProduct(
		@Param() param: DeleteProductPathParamDto,
	): void {
		console.log('param: ', param);
	
	}

}
