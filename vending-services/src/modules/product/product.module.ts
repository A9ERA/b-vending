import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from 'src/database/entities/product.entity';
import { MediaEntity } from 'src/database/entities/media.entity';
import { InventoryEntity } from 'src/database/entities/inventory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    ProductEntity,
    MediaEntity,
    InventoryEntity,
  ])],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
