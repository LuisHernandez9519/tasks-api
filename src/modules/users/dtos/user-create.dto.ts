import { ApiProperty } from '@nestjs/swagger/dist';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsBoolean,
  IsDefined,
} from 'class-validator';

export class UserCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsBoolean()
  superadmin: boolean;
}
