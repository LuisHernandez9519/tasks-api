import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusEnum } from 'src/common/enums/status.enum';
import { PasswordService } from 'src/common/services/password.service';
import { Repository } from 'typeorm';
import { UserCreateDto } from './dtos';
import { User } from './user.entity';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private readonly userRespository: Repository<User>,
        private readonly passwordService: PasswordService
    ){}

    async getUser(id: number): Promise<User>{
        
        const user = await this.userRespository.findOneBy({id})
        
        if (!user) {
            throw new NotFoundException(`Resource user not found`)
        }
        
        return user
    }

    async getUserByEmail(email: string): Promise<User>{

        const user = await this.userRespository.findOneBy({email})
        
        if (!user) {
            throw new NotFoundException(`Resource user with email "${email}" not found`)
        }

        return user
    }

    getUsers(){}

    async createUser(data: UserCreateDto): Promise<User>{

        //validate that email is unique
        const userEmailExist = await this.userRespository.findOneBy({email: data.email})

        if (userEmailExist) {
            throw new BadRequestException("The email is being used")
        }

        //encrypt password
        const passwordEncrypt = await this.passwordService.encryptPassword(data.email)

        const user = this.userRespository.create({
            ...data,
            password: passwordEncrypt,
            status: StatusEnum.ACTIVE
        })

        return await this.userRespository.save(user)           
       
    }

    updateUser(){}

    deleteUser(){}
}
