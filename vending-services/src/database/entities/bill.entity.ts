import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
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
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @Column({ type: 'int2', default: 0, name: 'amount_paid' })
  amountPaid: number;

  @Column({ type: 'int2', default: 0, name: 'change_given' })
  changeGiven: number;

  @Column({ type: 'json', nullable: true, name: 'transaction_cash_log' })
  transactionCashLog?: Record<string, any>[];
}
