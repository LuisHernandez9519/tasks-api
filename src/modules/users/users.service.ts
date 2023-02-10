import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryParamDto } from 'src/common/dtos';
import { StatusEnum } from './../../common/enums';
import { PasswordService } from 'src/common/services/password.service';
import { Brackets, Not, Repository } from 'typeorm';
import { UserCreateDto } from './dtos';
import { UserUpdateDto } from './dtos/user-update.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private readonly userRespository: Repository<User>,
        //@InjectManager() private readonly manager: EntityManager,
        private readonly passwordService: PasswordService
    ){}

    async getUser(id: number): Promise<User>{
        
        const user = await this.userRespository.findOneBy({id, status: Not(StatusEnum.DELETED)})
        
        if (!user) {
            throw new NotFoundException(`Resource user not found`)
        }
        
        return user
    }

    async getUserByEmail(email: string): Promise<User>{

        const user = await this.userRespository.findOneBy({email, status: Not(StatusEnum.DELETED)})
        
        if (!user) {
            throw new NotFoundException(`Resource user with email "${email}" not found`)
        }

        return user
    }

    async getUsers({limit, page, search}: QueryParamDto): Promise<{users: User[], totalCount: number}>{

        let queryBuilder = this.userRespository.createQueryBuilder('user')
                            .where('user.status != :status', {status: StatusEnum.DELETED})
        
        //serach by name or lastname or emil
        if (search) {

            queryBuilder.andWhere(
                new Brackets((qb)=> {
                    qb.where('user.name like :name', {name: `%${search}%`})
                    qb.orWhere('user.lastname like :lastname', {lastname: `%${search}%`})
                    qb.orWhere('user.email like :email', {email: `%${search}%`})
                })
            )
        }

        queryBuilder.orderBy('user.id', 'DESC')

        //pagination
        queryBuilder.take(limit)
        queryBuilder.skip((page-1) * limit)

        //count user total db
        const totalCount = await queryBuilder.getCount()

        const users = await queryBuilder.getMany()

        return {users, totalCount}
    }

    async createUser(data: UserCreateDto): Promise<User>{

        //validate that email is unique
        const userEmailExist = await this.userRespository.findOneBy({email: data.email, status: Not(StatusEnum.DELETED)})

        if (userEmailExist) {
            throw new BadRequestException("The email is being used")
        }

        //encrypt password
        const passwordEncrypt = await this.passwordService.encryptPassword(data.password)

        const user = this.userRespository.create({
            ...data,
            password: passwordEncrypt,
            status: StatusEnum.ACTIVE
        })

        return await this.userRespository.save(user)       
       
    }

    async updateUser(data: UserUpdateDto, id: number): Promise<User> {
        
        const user = await this.getUser(id)

        //if password is asigned
        if (data.password) {
            data.password = await this.passwordService.encryptPassword(data.password)
        }

        //if email is different to actual, verify that new email not using in other user
        if (data.email) {
            if (data.email !== user.email) {
                
                const user = await this.userRespository.findOneBy({email: data.email, status: Not(StatusEnum.DELETED)})
    
                if (user) {
                    throw new BadRequestException('The email is being used')
                }
    
            }
        }

        const userUpdate = this.userRespository.create({...user, ...data})

        return await this.userRespository.save(userUpdate)
    }

    async deleteUser(id: number): Promise<void>{

        //validate that user exist
        const user = await this.getUser(id)

        user.status = StatusEnum.DELETED

        await this.userRespository.save(user)
    }
}
