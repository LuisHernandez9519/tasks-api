import { IsString, IsNotEmpty, IsEmail, IsBoolean } from "class-validator"


export class UserCreateDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    lastname: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsBoolean()
    superadmin: boolean;
}