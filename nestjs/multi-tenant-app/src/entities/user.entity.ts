import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { UserRole } from "./enum/user-role.enum";
@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true})
    username: string;

    @Column()
    password: string;

    @Column({
      type: 'enum',
      enum: UserRole,
      default: UserRole.CUSTOMER
    })
    role: UserRole;
}