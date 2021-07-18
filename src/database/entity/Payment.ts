import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum Currency {
  CDF = 'cdf',
  USD = 'usd',
}

@Entity()
export class Payment extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'payment_id' })
  paymentId: number;

  @Column()
  amount: string;

  @Column({
    type: 'enum',
    enum: Currency,
    default: Currency.USD,
  })
  currency: Currency;

  @Column()
  user: number;

  @Column({ name: 'expiry_date' })
  expiryDate: string;

  @Column()
  package: number;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
