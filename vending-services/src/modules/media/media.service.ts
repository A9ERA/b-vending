import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MediaEntity } from 'src/database/entities/media.entity';
import { Repository } from 'typeorm';
import { GetMediaQueryParamDto } from './dtos/get-media.dto';
import { CreateMediaRequestBodyDto } from './dtos/create-media.dto';
import { UpdateMediaPathParamDto, UpdateMediaRequestBodyDto } from './dtos/update-media.dto';
import { ProductEntity } from 'src/database/entities/product.entity';
import { DeleteMediaPathParamDto } from './dtos/delete-media.dto';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(MediaEntity)
    private readonly mediaRepository: Repository<MediaEntity>,

    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async getMedia(id: GetMediaQueryParamDto['id']) {
    const media = await this.mediaRepository.findOneBy({ id });
    if (!media) {
      throw new NotFoundException('Media not found');
    }
    return media;
  }

  async createMedia({ data, fileType, productId }: CreateMediaRequestBodyDto) {
    const media = this.mediaRepository.create({
      data,
      fileType,
      product: productId ? { id: productId } : null,
    });
    return this.mediaRepository.save(media);
  }

  async updateMedia(
    id: UpdateMediaPathParamDto['id'],
    { data, fileType, productId }: UpdateMediaRequestBodyDto,
  ) {
    const media = await this.mediaRepository.findOne({
      where: { id },
      relations: ['product'],
    });
    if (!media) {
      throw new NotFoundException('Media not found');
    }

    media.data = data ?? media.data;
    media.fileType = fileType ?? media.fileType;
    
    if (productId === null) {
      media.product = null;
    } else if (productId !== undefined) {
      const product = await this.productRepository.findOneBy({ id: productId });
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      media.product = media.product ?? this.productRepository.create();
      media.product.id = productId;
    }

    return this.mediaRepository.save(media);
  }

  async deleteMedia(id: DeleteMediaPathParamDto['id']) {
    try {
      await this.mediaRepository.delete(id);
      return true;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
