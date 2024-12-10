import { Entity, PrimaryColumn, Column, Check } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('cash')
@Check(`
    (type = 'coin' AND value IN (1, 2, 5, 10)) OR
    (type = 'banknote' AND value IN (20, 50, 100, 500, 1000))
`)
export class CashEntity extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 20 })
  id: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
    enum: ['coin', 'banknote'],
  })
  type: string;

  @Column({ type: 'int2', nullable: false })
  value: number;

  @Column({ type: 'int2', default: 0 })
  quantity: number;
}
