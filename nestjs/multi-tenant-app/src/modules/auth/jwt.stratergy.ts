import { Injectable, UnauthorizedException } from "@nestjs/common";
import {InjectRepository} from '@nestjs/typeorm';
import {PassportStrategy} from '@nestjs/passport';
import {Strategy, ExtractJwt} from 'passport-jwt';
import { UserRepository } from "./users.repository";
import { JwtPayload } from "./jwt-payload.interface";
import { ConfigService } from "@nestjs/config";
import { User } from "src/entities/user.entity";

@Injectable()
export class JwtStratergy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private configService: ConfigService
    ) {
        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        }
        );
    }

    async validate(payload: JwtPayload): Promise<User> {
        const {username} = payload;
        const user = await this.userRepository.findOne({
            where: {username}
        })
        
        if(!user) {
            throw new UnauthorizedException()
        }
        return user
    }
}