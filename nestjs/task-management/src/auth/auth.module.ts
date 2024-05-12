import { Module } from '@nestjs/common';
import { TypeOrmModule } from  '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './user.entity';
import { UserRepository } from './users.repository';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import { JwtStratergy } from './jwt.stratergy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
              expiresIn: 3600
            }
        }
      }
    }),
    TypeOrmModule.forFeature([User])
  ],
  providers: [AuthService, UserRepository, JwtStratergy],
  controllers: [AuthController],
  exports: [JwtStratergy, PassportModule]
})
export class AuthModule {}
