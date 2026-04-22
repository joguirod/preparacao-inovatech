import { Router } from "express"
import { taskController } from "../controllers/task.controller";

export const taskRoute = Router();

taskRoute.get("/", taskController.listAll);
taskRoute.get("/:creatorId", taskController.getByCreatorId);
taskRoute.post("/", taskController.create);