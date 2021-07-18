import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum Unit {
  MONTH = 'month',
  YEAR = 'year',
}

@Entity()
export class Package extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'package_id' })
  packageId: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  price: string;

  @Column()
  validity: number;

  @Column({ default: true })
  active: boolean;

  @Column({
    type: 'enum',
    enum: Unit,
  })
  unit: Unit;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
