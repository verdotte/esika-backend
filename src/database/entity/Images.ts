import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn, ManyToOne, JoinColumn,
} from 'typeorm';

import { Properties } from './Properties';

@Entity()
export class Images extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'image_id' })
  imageId: number;

  @Column()
  url: string;

  @ManyToOne(() => Properties, properties => properties.image)
  @JoinColumn()
  property: Properties;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;


}