import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import { PasswordService } from './../../common/services/password.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,

    private readonly passwordService: PasswordService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.getUserByEmail(email);

    //validate password
    const matchPassword = await this.passwordService.comparePassword(
      password,
      user.password,
    );

    if (matchPassword) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: User) {
    const payload = { id: user.id, name: user.name };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
