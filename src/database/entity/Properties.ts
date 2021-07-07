import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { User } from './User';
import { Images } from './Images';
import { City } from './City';
import { Category } from './Category';

export enum type {
  SELL = 'sell',
  RENT = 'rent',
}

export enum unit {
  DAY = 'day',
  MONTH = 'month',
}

@Entity()
export class Properties extends BaseEntity {
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

  @Column({ name: 'cover_image' })
  coverImage: string;

  @Column({ default: true })
  active: boolean;

  @ManyToOne(() => Category, category => category.property)
  @JoinColumn()
  category: Category;

  @ManyToOne(() => User, user => user.property)
  @JoinColumn()
  user: User;

  @ManyToOne(() => City, city => city.property)
  @JoinColumn()
  city: City;

  @Column({ default: false })
  verified: boolean;

  @Column()
  slug: string;

  @Column({
    type: 'enum',
    enum: type,
  })
  type: type;

  @Column({
    type: 'enum',
    enum: unit,
    nullable: true
  })
  unit: type;

  @Column({ nullable: true })
  bedroom: string;

  @Column({ nullable: true })
  bathroom: string;

  @Column({ name: 'square_feet', nullable: true })
  squareFeet: string;

  @Column({ nullable: true })
  parking: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Images, image => image.property)
  @JoinColumn()
  image: Images[];

}

