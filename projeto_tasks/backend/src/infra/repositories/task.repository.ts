import { Task } from "../../domain/entities/task";
import { AppDataSource } from "../database/data-source";

export class TaskRepository {
    private repo = AppDataSource.getRepository(Task);

    findAll(): Promise<Task[]> {
        return this.repo.find();
    }

    findById(id: string): Promise<Task | null> {
        return this.repo.findOneBy({id});
    }

    findAllByCreatorId(creatorId: string): Promise<Task[]> {
        return this.repo.find({where : {creator: {id : creatorId}}})
    }

    create(data: Partial<Task>): Promise<Task> {
        const task = this.repo.create(data);
        return this.repo.save(task);
    }

    delete(task: Task) {
        this.repo.delete(task);
    }
}

export const taskRepository = new TaskRepository();