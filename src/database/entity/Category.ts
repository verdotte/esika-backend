import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn, OneToMany, JoinColumn,
} from 'typeorm';
import { Properties } from './Properties';

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'category_id' })
  categoryId: number;

  @Column()
  title: string;

  @Column({nullable: true})
  description: string;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Properties, property => property.category)
  @JoinColumn()
  property: Properties[];

}