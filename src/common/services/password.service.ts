import { Injectable } from '@nestjs/common';
import { hashSync, compare } from 'bcrypt';

@Injectable()
export class PasswordService {
  private readonly salt: number = 8;

  async encryptPassword(passwordPlain: string): Promise<string> {
    const passwordEncryt = hashSync(passwordPlain, 8);

    return passwordEncryt;
  }

  async comparePassword(
    password: string,
    passwordEncrypt: string,
  ): Promise<boolean> {
    const match = await compare(password, passwordEncrypt);
    return match;
  }
}
