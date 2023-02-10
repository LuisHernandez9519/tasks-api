import { Controller, Delete, Get, HttpException, HttpStatus, Patch, Post } from '@nestjs/common';
import { plainToInstance } from 'class-transformer'
import { Body, Param, Query } from '@nestjs/common/decorators';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { QueryParamDto, ResponsePaginationDto, ResponseSingleDto } from './../../common/dtos';
import { UserCreateDto, UserUpdateDto } from './dtos';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(
        private readonly userService: UsersService
    ){}

    @Get(':id')
    async getUser(@Param('id', ParseIntPipe) id: number) {
        try {
            const user = await this.userService.getUser(id)

            let responseObject = {
                success: true,
                message: 'user found',
                payload: user,
            }

            const responseSingleDto  = plainToInstance(ResponseSingleDto<User>, responseObject)

            return  responseSingleDto 

        } catch (error) {
            throw error
        }
    }

    @Get()
    async getUsers(@Query() data: QueryParamDto){
        try {
            const result = await this.userService.getUsers(data)

            let responseObject = {
                success: true,
                message: 'list users',
                payload: {
                    data: result.users,
                    page: data.page,
                    limit: data.limit,
                    totalCount: result.totalCount
                }
            }

            const responsePaginationDto = plainToInstance(ResponsePaginationDto<User>, responseObject)

            return responsePaginationDto  

        } catch (error) {
            throw error
        }
    }

    @Post()
    async createUser(@Body() dataCreate: UserCreateDto){
        try {
            const newUser = await this.userService.createUser(dataCreate)

            const responseObject = {
                success: true,
                message: 'user created',
                payload: newUser
            }

            const responsePaginationDto = plainToInstance(ResponseSingleDto<User>, responseObject)

            return responsePaginationDto

        } catch (error) {
            throw error
        }
    }

    @Patch(':id')
    async updateUser(@Body() dataUpdate: UserUpdateDto, @Param('id') id: number){
        try{
            const userUpdate = await this.userService.updateUser(dataUpdate, id)

            const responseObject = {
                success: true,
                message: 'user updated',
                payload: userUpdate
            }

            const responseSingleDto = plainToInstance(ResponseSingleDto<User>, responseObject)

            return responseSingleDto

        } catch(error) {
            throw error
        }
    }

    @Delete(':id')
    async deleteUser(@Param('id', ParseIntPipe) id: number){
        try {

            const userDeleted = await this.userService.deleteUser(id)

            const responseObject = {
                success: true,
                message: 'user deleted'
            }

            const responseSingleDto = plainToInstance(ResponseSingleDto<null>, responseObject)

            return responseSingleDto

        } catch (error) {
            throw error
        }
    }
}
