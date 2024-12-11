import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/database/entities/category.entity';
import { IsNull, Repository } from 'typeorm';
import { GetCategoryQueryParamDto } from './dtos/get-category.dto';
import { CreateCategoryRequestBodyDto } from './dtos/create-category.dto';
import {
  UpdateCategoryPathParamDto,
  UpdateCategoryRequestBodyDto,
} from './dtos/update-category.dto';
import { DeleteCategoryPathParamDto } from './dtos/delete-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async getCategories() {
    return this.categoryRepository.find({
      where: {
        parent: IsNull(),
      },
    });
  }

  async getSubCategories({ parentId }: GetCategoryQueryParamDto) {
    return this.categoryRepository.find({
      where: {
        parent: { id: parentId },
      },
    });
  }

  async createCategory({ name, parentId }: CreateCategoryRequestBodyDto) {
    const category = this.categoryRepository.create({
      name,
      parent: parentId ? { id: parentId } : null,
    });
    return this.categoryRepository.save(category);
  }

  async updateCategory(
    categoryId: UpdateCategoryPathParamDto['id'],
    { name, parentId }: UpdateCategoryRequestBodyDto,
  ) {
    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
      relations: ['parent'],
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    category.name = name;

    if (parentId === null) {
      category.parent = null;
    } else if (parentId !== undefined) {
      const parent = await this.categoryRepository.findOneBy({ id: parentId });
      if (!parent) {
        throw new NotFoundException('Parent Category not found');
      }

      category.parent = category.parent ?? this.categoryRepository.create();
      category.parent.id = parentId;
    }
    return this.categoryRepository.save(category);
  }

  async delateCategory(categoryId: DeleteCategoryPathParamDto['id']) {
    try {
      await this.categoryRepository.delete(categoryId);
      return true;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
