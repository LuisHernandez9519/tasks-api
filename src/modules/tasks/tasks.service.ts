import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { QueryParamDto } from "src/common/dtos";
import { StatusTaskEnum } from "src/common/enums/status-task.enum";
import { Not, Repository } from "typeorm";
import { CreateTaskDto, UpdateTaskDto } from "./dtos";
import { Task } from "./task.entity";

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(Task) private readonly taskRepository: Repository<Task>
    ){}
    async getTask(id: number): Promise<Task>{

        const task = await this.taskRepository.findOneBy({status: Not(StatusTaskEnum.DELETED), id})

        if (!task) {
            throw new BadRequestException('task not found')
        }

        return task
    }

    async getTasks({limit, search, page}: QueryParamDto): Promise<{users: Task[], totalCount: number}>{
        
        const queryBuilder = this.taskRepository.createQueryBuilder('task')
        queryBuilder.where('task.status != :status', { status: StatusTaskEnum.DELETED })

        //searching
        if (search) {
            queryBuilder.andWhere('task.title like :title', { title: `%${search}%` })
        }

        queryBuilder.orderBy('task.id', 'DESC')

        //pagination
        queryBuilder.take(limit)
        queryBuilder.skip((page - 1) * limit)

        const totalCount = await queryBuilder.getCount()

        const users = await queryBuilder.getMany()

        return {users, totalCount}
    }

    async createTask(data: CreateTaskDto): Promise<Task>{

        const task = this.taskRepository.create({
            ...data,
            status: StatusTaskEnum.CREATED
        })

        return await this.taskRepository.save(task)
    }

    async updateTask(data: UpdateTaskDto, id: number): Promise<Task>{

        const task = await this.getTask(id)

        const taskUpdate = this.taskRepository.create({...task, ...data})

        return await this.taskRepository.save(taskUpdate)
    }

    async deleteTask(id: number): Promise<void>{

        const task = await this.getTask(id)

        task.status = StatusTaskEnum.DELETED

        await this.taskRepository.save(task)
    }    
}