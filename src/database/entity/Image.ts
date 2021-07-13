import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  // ManyToOne,
  // JoinColumn,
} from 'typeorm';

// import { Property } from './Property';

@Entity()
export class Image extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'image_id' })
  imageId: number;

  @Column()
  url: string;

  @Column()
  property: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
