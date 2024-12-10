import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('category')
export class CategoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 128, nullable: false })
  name: string;

  @ManyToOne(() => CategoryEntity, (category) => category.id, { nullable: true })
  @JoinColumn({ name: 'parent_id' })
  parent?: CategoryEntity;
}
