import {Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {User} from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt  from 'bcrypt';

export class UserRepository extends Repository<User> {
    constructor (
        @InjectRepository(User)
        private uerRepository: Repository<User>
    ) {
        super(uerRepository.target, uerRepository.manager, uerRepository.queryRunner)
    }

    async createUser(authCredentialsDto: AuthCredentialsDto) {
        const { username, password } = authCredentialsDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = this.create({username, password: hashedPassword});
        try {
            await this.save(user)
        } catch (error) {
           if(error.code === '23505') {
                throw new ConflictException('Username already exists')
           } else {
             throw new InternalServerErrorException()
           }
        }
    }
}

