import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ProductEntity } from './product.entity';
import { CategoryEntity } from './category.entity';

@Entity('inventory')
export class InventoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => ProductEntity, { nullable: false })
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @Column({ type: 'int2', default: 0 })
  quantity: number;

  @ManyToOne(() => CategoryEntity, { nullable: true })
  @JoinColumn({ name: 'category_id' })
  category?: CategoryEntity;
}
