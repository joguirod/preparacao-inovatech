import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { Role } from "../../domain/entities/enums/role";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    name: string;
    
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    password: string;

    @IsEnum(Role)
    @IsOptional()
    role: Role;

    constructor(name: string, email: string, password: string, role: Role) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    } 
}

export class SimpleUserDto {
    id: string;
    name: string;
    email: string;
    role: Role
    createdAt: Date;

    constructor(user: { id: string; name: string; email: string; role: Role; createdAt: Date }) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.role = user.role;
        this.createdAt = user.createdAt;
    }
}