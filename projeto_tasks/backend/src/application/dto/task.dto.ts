import { IsNotEmpty, IsString } from "class-validator";
import { SimpleUserDto } from "./user.dto";

export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    creatorId: string;

    constructor(title: string, description: string, creatorId: string) {
        this.title = title;
        this.description = description;
        this.creatorId = creatorId;
    }
}

export class TaskResponseDto {
    id: string;
    title: string;
    description: string;
    creatorId: string;
    createdAt: Date;

    constructor(id: string, title: string, description: string, creatorId: string, createdAt: Date) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.creatorId = creatorId;
        this.createdAt = createdAt;
    }
}