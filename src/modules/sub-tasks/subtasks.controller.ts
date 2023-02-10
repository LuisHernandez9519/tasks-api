import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { QueryParamDto, ResponseSingleDto } from "src/common/dtos";
import { CreateSubTaskDto, UpdateSubTaskDto } from "./dtos";
import { SubTask } from "./subtask.entity";
import { SubTaskService } from "./subtask.service";

@Controller('subtasks')
export class SubtasksController {

    constructor(
        private readonly subTaskService: SubTaskService
    ){}

    @Get(':id')
    async subtask(@Param('id', ParseIntPipe) id: number){

        try {
            const subtask = await this.subTaskService.subtask(id)

            const responseObject = {
                success: true,
                message: 'subtask found',
                payload: subtask
            }

            const responseSingleDto = plainToInstance(ResponseSingleDto<SubTask>, responseObject)

            return responseSingleDto

        } catch (error) {
            throw error
        }

    }

    @Get('/task/:task_id')
    async subtasks(@Query() query: QueryParamDto, @Param('task_id') task_id: number){

        const subtasks = await this.subTaskService.subtasks(query, task_id)

        const responseObject = {
            success: true,
            message: 'list subtaks',
            payload: subtasks
        }

        const responseSingleDto = plainToInstance(ResponseSingleDto<SubTask>, responseObject)

        return responseSingleDto
    }

    @Post()
    async createSubtask(@Body() data: CreateSubTaskDto){
        
        try {
            const subtask = await this.subTaskService.createSubtask(data)
            
            const responseObject = {
                success: true,
                message: 'subtask created',
                payload: subtask
            }

            const responseSingleDto = plainToInstance(ResponseSingleDto<SubTask>, responseObject)

            return responseSingleDto

        } catch (error) {
            throw error
        }
    }

    @Patch(':id')
    updateSubtask(@Body() data: UpdateSubTaskDto, @Param('id', ParseIntPipe) id: number){
        return this.subTaskService.updateSubtask(data, id)
    }

    @Delete(':id')
    deleteSubtask(@Param('id', ParseIntPipe) id: number){
        return this.subTaskService.deleteSubtask(id)
    }
}