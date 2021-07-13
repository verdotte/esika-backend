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

import { Property } from './Property';

@Entity()
export class City extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'city_id' })
  cityId: number;

  @Column()
  name: string;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Property, (property) => property.city)
  @JoinColumn()
  property: Property[];
}
