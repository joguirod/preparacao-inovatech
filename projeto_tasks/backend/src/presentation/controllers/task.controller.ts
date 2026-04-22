import { NextFunction, Request, Response } from "express";
import { taskService, TaskService } from "../../application/services/task.service";

export class TaskController {
    constructor(
        private service: TaskService = taskService,
    ) {}

    listAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.service.findAll();
            res.status(200).json(result);
        } catch(err) {
            next(err);
        }
        
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.service.create(req.body);
            res.status(201).json(result);
        } catch (err) {
            next(err);
        }
    }

    getByCreatorId = async (req: Request<{creatorId: string}>, res: Response, next: NextFunction) => {
        try {
            const result = await this.service.findAllByCreatorId(req.params.creatorId);
            res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    }
}

export const taskController = new TaskController();