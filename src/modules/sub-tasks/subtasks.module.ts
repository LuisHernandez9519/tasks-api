import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../tasks/task.entity';
import { SubTask } from './subtask.entity';
import { SubTaskService } from './subtask.service';
import { SubtasksController } from './subtasks.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SubTask, Task])],
  controllers: [SubtasksController],
  providers: [SubTaskService],
})
export class SubTasksModule {}
