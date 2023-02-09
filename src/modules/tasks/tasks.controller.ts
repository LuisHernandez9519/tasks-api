import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { QueryParamDto, ResponsePaginationDto, ResponseSingleDto } from 'src/common/dtos';
import { CreateTaskDto, UpdateTaskDto } from './dtos';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {

    constructor(
        private readonly taskService: TasksService
    ){}

    @Get(':id')
    async getTask(@Param('id', ParseIntPipe) id: number){

        try{
            const user = await this.taskService.getTask(id)

            const responseObject = {
                success: true,
                message: 'user found',
                payload: user
            }

            const responseSingleDto = plainToInstance(ResponseSingleDto<Task>, responseObject)

            return responseSingleDto

        }catch(error) {
            throw error
        }
        
    }

    @Get()
    async getTasks(@Query() data: QueryParamDto){
        try{
            const result = await this.taskService.getTasks(data)

            const responseObject = {
                success: true,
                message: 'list users',
                payload: {
                    data: result.users,
                    page: data.page,
                    limit: data.limit,
                    totalCount: result.totalCount
                }
            }

            const responsePaginationDto = plainToInstance(ResponsePaginationDto<Task>, responseObject)

            return responsePaginationDto
        }catch(error) {
            throw error
        }
    }

    @Post()
    async createTask(@Body() data: CreateTaskDto){
        try{
            const newUser = await this.taskService.createTask(data)

            const responseObject = {
                success: true,
                message: 'task created',
                payload: newUser
            }

            const responseSingleDto = plainToInstance(ResponseSingleDto<Task>, responseObject)

            return responseSingleDto

        }catch(error) {
            throw error
        }
    }

    @Patch(':id')
    async updateTask(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateTaskDto){
        try {
            const userUpdate = await this.taskService.updateTask(data, id)

            const responseObject = {
                success: true,
                message: 'task updated',
                payload: userUpdate
            }

            const responseSingleDto = plainToInstance(Task, responseObject)

            return responseSingleDto
        } catch (error) {
            throw error
        }
    }

    @Delete(':id')
    async deleteTask(@Param('id', ParseIntPipe) id: number){
        try {
            const userDeleted = await this.taskService.deleteTask(id)

            const responseObject = {
                success: true,
                message: 'task deleted',
            }

            const responseSingleDto = plainToInstance(ResponseSingleDto<null>, responseObject)

            return responseSingleDto
            
        } catch (error) {
            throw error
        }
        return this.taskService.deleteTask(id)
    }
}
