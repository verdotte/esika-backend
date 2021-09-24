import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { Payment } from './Payment';
import { Property } from './Property';

export enum UserType {
  AGENT = 'agent',
  NORMAL = 'normal',
}

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  userId: number;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'phone_number' })
  phoneNumber: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  picture: string;

  @Column({ default: false })
  verified: boolean;

  @Column({
    name: 'user_type',
    type: 'enum',
    enum: UserType,
    default: UserType.NORMAL,
  })
  userType: UserType;

  @Column({ default: true })
  active: boolean;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  bio: string;

  @OneToMany(() => Payment, (payment) => payment.user)
  @JoinColumn()
  payment: Payment[];

  @OneToMany(() => Property, (property) => property.user)
  @JoinColumn()
  property: Property[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
