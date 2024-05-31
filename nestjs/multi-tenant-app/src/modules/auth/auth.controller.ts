import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';
import { DataSource } from 'typeorm';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/create')
    signUp(@Body() authCredentialsDto: AuthCredentialsDto, @Req() request: Request): Promise<void> {
        const dataSource: DataSource =  request['tenantConnection']
        return this.authService.signUp(authCredentialsDto, dataSource)
    }

    @Post('/signin')
    SignIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
        return this.authService.signIn(authCredentialsDto)
    }

    @Post('/test')
    @UseGuards(JwtAuthGuard)
    test(@Req() req) {
       console.log(req)
    }
}
