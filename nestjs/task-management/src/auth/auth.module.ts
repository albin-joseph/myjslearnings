import { Module } from '@nestjs/common';
import { TypeOrmModule } from  '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './user.entity';
import { UserRepository } from './users.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  providers: [AuthService, UserRepository],
  controllers: [AuthController]
})
export class AuthModule {}
