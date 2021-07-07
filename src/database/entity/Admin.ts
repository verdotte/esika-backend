import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum AdminRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
}

@Entity()
export class Admin extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'admin_id' })
  adminId: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ name: 'phone_number' })
  phoneNumber: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  picture: string;

  @Column({
    type: 'enum',
    enum: AdminRole,
  })
  role: AdminRole;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
