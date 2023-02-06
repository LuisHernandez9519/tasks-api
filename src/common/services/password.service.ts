import { Injectable } from "@nestjs/common"
import {hashSync} from 'bcrypt'

@Injectable()
export class PasswordService {
    
    private readonly salt: number = 8

    async encryptPassword(passwordPlain: string): Promise<string>{
        
        const passwordEncryt = hashSync(passwordPlain, 8)
        
        return passwordEncryt
    }
}