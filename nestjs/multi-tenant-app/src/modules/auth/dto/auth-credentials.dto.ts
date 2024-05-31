import { IsString, MinLength, MaxLength, Matches, IsOptional, IsEnum } from "class-validator";
import { UserRole } from "src/entities/enum/user-role.enum";
import { DataSource } from "typeorm";

export class AuthCredentialsDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Password is too weak'
    })
    password: string;

    @IsEnum(UserRole)
    @IsOptional()
    role?: UserRole; 

    @IsOptional()
    tenantConnection?: DataSource
}