import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt  from 'bcrypt';
import {JwtService} from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { DataSource } from 'typeorm';
import { User } from 'src/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private  userRepository: UserRepository,
        private jwtService: JwtService
      ) {}

       signUp (authCredentialsDto: AuthCredentialsDto, dataSource: DataSource): Promise<void> {
        return this.userRepository.createUser(authCredentialsDto, dataSource);
      }

     async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string, role: string}> {
        const {username, password} = authCredentialsDto;
        const user = await this.userRepository.findOne({
            where:{username}
        })

        if(user && (await bcrypt.compare(password, user.password))) {
            const payload: JwtPayload = { username, role: user.role }
            const accessToken: string = await this.jwtService.sign(payload);
            return {accessToken, role: user.role}
        } else {
            throw new UnauthorizedException('Please check your login credentials');
        }
      }
}
