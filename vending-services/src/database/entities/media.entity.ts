import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ProductEntity } from './product.entity';

@Entity('media')
export class MediaEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false })
  data: string;

  @Column({ type: 'varchar', length: 128, nullable: false })
  fileType: string;

  @ManyToOne(() => ProductEntity, (product) => product.id, { nullable: true })
  product?: ProductEntity;
}
