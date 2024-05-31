import { Module } from '@nestjs/common';
import { TypeOrmModule } from  '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from './users.repository';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import { JwtStratergy } from './jwt.stratergy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from 'src/entities/user.entity';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';
import { RolesGuard } from 'src/common/guard/roles.guard';

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
  providers: [AuthService, UserRepository, JwtStratergy, JwtAuthGuard, RolesGuard],
  controllers: [AuthController],
  exports: [JwtStratergy, PassportModule]
})
export class AuthModule {}
