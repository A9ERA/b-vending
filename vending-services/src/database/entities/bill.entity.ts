import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ProductEntity } from './product.entity';

@Entity('bill')
export class BillEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
    enum: ['pending', 'canceled', 'completed', 'failed'],
  })
  status: string;

  @ManyToOne(() => ProductEntity, { nullable: false })
  product: ProductEntity;

  @Column({ type: 'int2', default: 0 })
  amountPaid: number;

  @Column({ type: 'int2', default: 0 })
  changeGiven: number;

  @Column({ type: 'json', nullable: true })
  transactionCashLog?: Record<string, any>[];
}
