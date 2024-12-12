import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from 'src/database/entities/product.entity';
import { MediaEntity } from 'src/database/entities/media.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    ProductEntity,
    MediaEntity,
  ])],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
