import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { User } from "./User";
import { Package } from "./Package";

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

  @ManyToOne(() => User, user => user.payment)
  @JoinColumn()
  user: User;

  @Column({ name: 'expiry_date'})
  expiryDate: string;

  @OneToMany(() => Package, pack => pack.payment)
  @JoinColumn()
  package: Payment[];

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

}