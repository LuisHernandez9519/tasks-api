import { StatusEnum, StatusSubTaskEnum } from "./../../common/enums";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Task } from "../tasks/task.entity";

@Entity('subtasks')
export class SubTask {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 250})
    description: string;

    @Column({default: false})
    completed: boolean;

    @Column()
    task_id: number;

    @CreateDateColumn({type: 'timestamp with time zone'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp with time zone'})
    updateAt: Date;

    @Column({type: 'enum', enum: StatusSubTaskEnum})
    status: StatusSubTaskEnum;

    @JoinColumn({name: 'task_id'})
    @ManyToOne(()=>Task, (task) => task.subtaks)
    task: Task
}