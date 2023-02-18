import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryParamDto } from 'src/common/dtos';
import {
  StatusEnum,
  StatusSubTaskEnum,
  StatusTaskEnum,
} from 'src/common/enums';
import { In, Not, Repository } from 'typeorm';
import { Task } from '../tasks/task.entity';
import { CreateSubTaskDto, UpdateSubTaskDto } from './dtos';
import { SubTask } from './subtask.entity';

@Injectable()
export class SubTaskService {
  constructor(
    @InjectRepository(SubTask)
    private readonly subtaskRepository: Repository<SubTask>,
    @InjectRepository(Task) private readonly taskRespository: Repository<Task>,
  ) {}

  async subtask(id: number): Promise<SubTask> {
    const subtask = await this.subtaskRepository.findOneBy({
      id,
      status: Not(StatusSubTaskEnum.DELETED),
    });

    if (!subtask) {
      throw new NotFoundException(`resource subtask with id=${id} not found`);
    }

    return subtask;
  }

  subtasks({ limit, page, search }: QueryParamDto, task_id: number) {
    const subtasks = this.subtaskRepository.find({
      where: {
        task_id,
        status: Not(StatusSubTaskEnum.DELETED),
      },
    });

    return subtasks;
  }

  async createSubtask(data: CreateSubTaskDto): Promise<SubTask> {
    //validate that task_id exist
    const task = await this.taskRespository.findOneBy({
      id: data.task_id,
      status: In([StatusTaskEnum.CREATED, StatusTaskEnum.STARTED]),
    });

    if (!task) {
      throw new NotFoundException(
        `resource task with id=${data.task_id} not found`,
      );
    }

    const subtask = this.subtaskRepository.create({
      ...data,
      completed: false,
      status: StatusSubTaskEnum.TODO,
    });

    return await this.subtaskRepository.save(subtask);
  }

  async updateSubtask(data: UpdateSubTaskDto, id: number): Promise<SubTask> {
    //validate that subtask exists
    const subtask = await this.subtask(id);

    const subtaksUpdate = this.subtaskRepository.create({
      ...subtask,
      ...data,
    });

    return this.subtaskRepository.save(subtaksUpdate);
  }

  async deleteSubtask(id: number): Promise<void> {
    //validate that subtask exists
    const subtask = await this.subtask(id);

    subtask.status = StatusSubTaskEnum.DELETED;

    await this.subtaskRepository.save(subtask);
  }
}
