import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { MediaEntity } from './media.entity';

@Entity('product')
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  title: string;

  @Column({ type: 'int2', default: 0 })
  price: number;

  @ManyToOne(() => MediaEntity, { nullable: true })
  previewPic: MediaEntity;

  @Column({ type: 'text', nullable: true })
  desc?: string;
}
