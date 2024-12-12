import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductRequestBodyDto } from './dtos/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetProductQueryParamDto } from './dtos/get-product.dto';
import { UpdateProductPathParamDto, UpdateProductRequestBodyDto } from './dtos/update-product.dto';
import { ProductEntity } from 'src/database/entities/product.entity';
import { MediaEntity } from 'src/database/entities/media.entity';
import { DeleteProductPathParamDto } from './dtos/delete-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,

    @InjectRepository(MediaEntity)
    private readonly mediaRepository: Repository<MediaEntity>,
  ) {}

  async getProductById(id: GetProductQueryParamDto['id']) {
    return this.productRepository.findOne({
      where: { id },
      relations: ['previewPic'],
    });
  }

  async createProduct({
    title,
    price,
    desc,
    previewPicId,
  }: CreateProductRequestBodyDto) {
    const product = this.productRepository.create({
      title,
      price,
      desc,
      previewPic: previewPicId ? { id: previewPicId } : null,
    });
    return this.productRepository.save(product);
  }

  async updateProduct(
    productId: UpdateProductPathParamDto['id'],
    {
      title,
      price,
      desc,
      previewPicId,
    }: UpdateProductRequestBodyDto,
  ) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
      relations: ['previewPic'],
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    product.title = title ?? product.title;
    product.price = price ?? product.price;
    product.desc = desc ?? product.desc;

    if (previewPicId === null) {
      product.previewPic = null;
    } else if (previewPicId !== undefined) {
      const previewPic = await this.mediaRepository.findOneBy({ id: previewPicId });
      if (!previewPic) {
        throw new NotFoundException('Not found media');
      }

      product.previewPic = product.previewPic ?? this.mediaRepository.create();
      product.previewPic.id = previewPicId;
    }
    return this.productRepository.save(product);
  }

  async delateProduct(productId: DeleteProductPathParamDto['id']) {
    try {
      await this.productRepository.delete(productId);
      return true;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
