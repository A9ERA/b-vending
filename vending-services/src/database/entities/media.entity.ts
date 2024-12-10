import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ProductEntity } from './product.entity';

@Entity('media')
export class MediaEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false })
  data: string;

  @Column({ type: 'varchar', length: 128, nullable: false, name: 'file_type' })
  fileType: string;

  @ManyToOne(() => ProductEntity, (product) => product.id, { nullable: true })
  @JoinColumn({ name: 'product_id' })
  product?: ProductEntity;
}
