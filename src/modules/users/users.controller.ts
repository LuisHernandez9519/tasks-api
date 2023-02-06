import { Controller, Delete, Get, HttpException, HttpStatus, Patch, Post } from '@nestjs/common';
import { Body, Param } from '@nestjs/common/decorators';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { UserCreateDto } from './dtos';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(
        private readonly userService: UsersService
    ){}

    @Get(':id')
    getUser(@Param('id', ParseIntPipe) id: number) {
        console.log({id})
        try {
            return this.userService.getUser(id)
        } catch (error) {
            throw new HttpException('Ups, ocurrió un problemas en el servidor',HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Get()
    getUsers(){}

    @Post()
    createUser(@Body() useDto: UserCreateDto){
        try {
            return this.userService.createUser(useDto)
        } catch (error) {
            throw new HttpException('Ups, ocurrió un problemas en el servidor',HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Patch()
    updateUser(){}

    @Delete()
    deleteUser(){}
}
