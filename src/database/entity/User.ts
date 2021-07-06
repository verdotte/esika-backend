import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn
} from 'typeorm';

import { Payment } from "./Payment";
import { Properties } from "./Properties";

export enum UserType {
  HOST = 'host',
  NORMAL = 'normal',
}

@Entity()
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
  })
  userType: UserType;

  @Column({ default: true })
  active: boolean;

  @OneToMany(() => Payment, payment => payment.user)
  @JoinColumn()
  payment: Payment[];

  @OneToMany(() => Properties, property => property.user)
  @JoinColumn()
  property: Properties[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
