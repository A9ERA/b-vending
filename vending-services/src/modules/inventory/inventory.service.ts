import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/database/entities/category.entity';
import { InventoryEntity } from 'src/database/entities/inventory.entity';
import { ProductEntity } from 'src/database/entities/product.entity';
import { Repository } from 'typeorm';
import { CreateInventoryRequestBodyDto } from './dtos/create-inventory.dto';
import {
  UpdateInventoryPathParamDto,
  UpdateInventoryRequestBodyDto,
} from './dtos/update-inventory.dto';
import { DeleteInventoryPathParamDto } from './dtos/delete-inventory.dto';
import { GetInventoryQueryParamDto } from './dtos/get-inventory.dto';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(InventoryEntity)
    private readonly inventoryRepository: Repository<InventoryEntity>,

    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,

    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async getInventory(categoryId: GetInventoryQueryParamDto['categoryId']) {
    return this.inventoryRepository.find({
      ...(categoryId && {
        where: { category: { id: categoryId } },
      }),
      relations: ['product', 'category'],
    });
  }

  async createInventory({
    productId,
    quantity,
    categoryId,
  }: CreateInventoryRequestBodyDto) {
    const dupProduct = await this.inventoryRepository.findOneBy({
      product: { id: productId },
    });
    if (dupProduct) {
      console.log(dupProduct);

      throw new ConflictException(
        'There is already this product in inventory.',
      );
    }
    const inventory = this.inventoryRepository.create({
      quantity,
      product: { id: productId },
      category: categoryId ? { id: categoryId } : null,
    });
    return this.inventoryRepository.save(inventory);
  }

  async updateInventory(
    inventoryId: UpdateInventoryPathParamDto['id'],
    { productId, quantity, categoryId }: UpdateInventoryRequestBodyDto,
  ) {
    const inventory = await this.inventoryRepository.findOne({
      where: { id: inventoryId },
      relations: ['product', 'category'],
    });
    if (!inventory) {
      throw new NotFoundException('Inventory not found');
    }

    inventory.quantity = quantity ?? inventory.quantity;

    if (productId === null) {
      inventory.product = null;
    } else if (productId !== undefined) {
      const product = await this.productRepository.findOneBy({
        id: productId,
      });
      if (!product) {
        throw new NotFoundException('Not found product');
      }

      inventory.product = inventory.product ?? this.productRepository.create();
      inventory.product.id = productId;
    }

    if (categoryId === null) {
      inventory.category = null;
    } else if (categoryId !== undefined) {
      const category = await this.categoryRepository.findOneBy({
        id: categoryId,
      });
      if (!category) {
        throw new NotFoundException('Not found category');
      }

      inventory.category =
        inventory.category ?? this.categoryRepository.create();
      inventory.category.id = categoryId;
    }
    return this.inventoryRepository.save(inventory);
  }

  async delateInventory(inventoryId: DeleteInventoryPathParamDto['id']) {
    try {
      await this.inventoryRepository.delete(inventoryId);
      return true;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
