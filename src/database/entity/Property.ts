import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';

import { tokenUtil } from '../../utils';

export enum PropertyType {
  SELL = 'sell',
  RENT = 'rent',
}

export enum Unit {
  DAY = 'day',
  MONTH = 'month',
  YEAR = 'year',
}

export enum Currency {
  USD = 'usd',
  CF = 'cf',
}

@Entity({ name: 'property' })
export class Property extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'property_id' })
  propertyId: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  price: string;

  @Column()
  location: string;

  @Column({ nullable: true })
  lat: number;

  @Column({ nullable: true })
  lng: number;

  @Column({ default: true })
  active: boolean;

  @Column()
  category: number;

  @Column()
  user: number;

  @Column()
  city: number;

  @Column({ default: false })
  verified: boolean;

  @Column()
  slug: string;

  @Column({
    type: 'enum',
    enum: PropertyType,
  })
  type: PropertyType;

  @Column({
    type: 'enum',
    enum: Unit,
    nullable: true,
  })
  unit: Unit;

  @Column({ nullable: true })
  bedroom: number;

  @Column({ nullable: true })
  bathroom: boolean;

  @Column({ name: 'square_feet', nullable: true })
  squareFeet: string;

  @Column({ nullable: true })
  parking: boolean;

  @Column({ nullable: true })
  balcony: boolean;

  @Column({
    type: 'enum',
    enum: Currency,
    nullable: true,
  })
  currency: Currency;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @BeforeInsert()
  setSlug(): void {
    this.slug = `${this.title.replace(/ +/g, '')}${tokenUtil.slugGenerator(
      12,
    )}`;
  }
}
