import { UserRole } from "src/entities/enum/user-role.enum";

export interface JwtPayload {
    username: string;
    role: UserRole
}