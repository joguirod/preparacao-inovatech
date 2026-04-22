import { taskRepository, TaskRepository } from "../../infra/repositories/task.repository";
import { userRepository, UserRepository } from "../../infra/repositories/user.repository";
import { CreateTaskDto, TaskResponseDto } from "../dto/task.dto";

export class TaskService {
    constructor(
        private taskRepo: TaskRepository = taskRepository,
        private userRepo: UserRepository = userRepository,
    ) {}

    async create(data: CreateTaskDto): Promise<TaskResponseDto> {
        const creator = await this.userRepo.findById(data.creatorId);
        if (!creator) throw new Error(`User with id ${data.creatorId} not found`)

        const task = await this.taskRepo.create({
            title: data.title,
            description: data.description,
            creator: creator
        })

        return new TaskResponseDto(task.id, task.title, task.description, task.creator.id, task.createdAt);
    }

    async findAll(): Promise<TaskResponseDto[]>{
        const tasks = await this.taskRepo.findAll();
        return tasks.map((task) => new TaskResponseDto(task.id, task.title, task.description, task.creator.id, task.createdAt))
    }

    async findAllByCreatorId(creatorId: string): Promise<TaskResponseDto[]> {
        const tasks = await this.taskRepo.findAllByCreatorId(creatorId);
        return tasks.map((task) => new TaskResponseDto(task.id, task.title, task.description, task.creator.id, task.createdAt))
    }

    async findByTaskId(taskId: string): Promise<TaskResponseDto | null> {
        const task = await this.taskRepo.findById(taskId);
        if (!task) {
            throw new Error(`Task with id ${taskId} not found`)
        }

        return new TaskResponseDto(task.id, task.title, task.description, task.creator.id, task.createdAt);
    }

    async delete(taskId: string) {
        const task = await this.taskRepo.findById(taskId);
        if (!task) {
            throw new Error(`Task with id ${taskId} not found`);
        }
        
        this.taskRepo.delete(task);
    }
}

export const taskService = new TaskService();