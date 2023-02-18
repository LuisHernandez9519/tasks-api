import { StatusEnum } from './../../common/enums';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Task } from '../tasks/task.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  name: string;

  @Column({ length: 100, nullable: false })
  lastname: string;

  @Column({ length: 250, nullable: false })
  email: string;

  @Column({ length: 100, nullable: false })
  password: string;

  @Column({ default: false })
  superadmin: boolean;

  @CreateDateColumn({ select: false, type: 'timestamp with time zone' })
  createAt: Date;

  @UpdateDateColumn({ select: false, type: 'timestamp with time zone' })
  updatedAt: Date;

  @Column({ type: 'enum', enum: StatusEnum })
  status: StatusEnum;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
