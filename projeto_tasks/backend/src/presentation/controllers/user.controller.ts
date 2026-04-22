import { NextFunction, Request, Response } from "express";
import { userService, UserService } from "../../application/services/user.service";

export class UserController {
    constructor(
        private service: UserService = userService,
    ) {}

    listAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await this.service.findAll();
            res.status(200).json(users);
        } catch (err) {
            next(err);
        }
    }

    findById = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
        try {
            const user = await this.service.findById(req.params.id);
            return res.status(200).json(user);
        } catch (err) {
            next(err);
        }
    }
}

export const userController = new UserController();