import { StatusEnum } from "src/common/enums/status.enum";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100, nullable: false})
    name: string;

    @Column({length: 100, nullable: false})
    lastname: string;

    @Column({length: 250, nullable: false})
    email: string;

    @Column({length: 100, nullable: false, select: false})
    password: string;

    @Column({default: false})
    superadmin: boolean;

    @CreateDateColumn({select: false})
    createAt: Date;

    @UpdateDateColumn({select: false})
    updatedAt: Date;
    
    @Column({type: 'enum', enum: StatusEnum})
    status: StatusEnum;
}