import { PriorityTaskEnum } from "src/common/enums/priority-task.enum";
import { StatusTaskEnum } from "src/common/enums/status-task.enum";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Task {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;
    
    @Column({nullable: true})
    date_start: Date;

    @Column({nullable: true})
    date_finish: Date;

    @Column({nullable: true})
    user_id: number;

    @Column({nullable: true, type:'enum', enum: PriorityTaskEnum})
    priority: PriorityTaskEnum;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @Column({type:'enum',enum: StatusTaskEnum})
    status: StatusTaskEnum
}