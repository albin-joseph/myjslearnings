import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt  from 'bcrypt';
import {JwtService} from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private jwtService: JwtService
      ) {}

       signUp (authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.userRepository.createUser(authCredentialsDto);
      }

     async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
        const {username, password} = authCredentialsDto;
        const user = await this.userRepository.findOne({
            where:{username}
        })

        if(user && (await bcrypt.compare(password, user.password))) {
            const payload: JwtPayload = { username }
            const accessToken: string = await this.jwtService.sign(payload);
            return {accessToken}
        } else {
            throw new UnauthorizedException('Please check your login credentials');
        }
      }
}
