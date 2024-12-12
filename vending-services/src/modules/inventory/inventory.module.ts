import { Module } from '@nestjs/common';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/database/entities/category.entity';
import { InventoryEntity } from 'src/database/entities/inventory.entity';
import { ProductEntity } from 'src/database/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    CategoryEntity,
    InventoryEntity,
    ProductEntity,
  ])],
  controllers: [InventoryController],
  providers: [InventoryService]
})
export class InventoryModule {}
