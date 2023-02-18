import { PriorityTaskEnum, StatusTaskEnum } from './../../common/enums';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SubTask } from '../sub-tasks/subtask.entity';
import { User } from '../users/user.entity';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  date_start: Date;

  @Column({ nullable: true })
  date_finish: Date;

  @Column({ nullable: true })
  user_id: number;

  @Column({ nullable: true, type: 'enum', enum: PriorityTaskEnum })
  priority: PriorityTaskEnum;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updateAt: Date;

  @Column({ type: 'enum', enum: StatusTaskEnum })
  status: StatusTaskEnum;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User, (user) => user.tasks)
  user: User;

  @OneToMany(() => SubTask, (subtask) => subtask.task)
  subtaks: SubTask[];
}
