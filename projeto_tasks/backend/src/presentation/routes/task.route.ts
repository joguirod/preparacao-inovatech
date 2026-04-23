import { Router } from "express"
import { taskController } from "../controllers/task.controller";
import { requireRole } from "../middlewares/role.middleware";
import { Role } from "../../domain/entities/enums/role";

export const taskRoute = Router();

taskRoute.use(requireRole(Role.USER, Role.ADMIN));

taskRoute.get("/", taskController.listAll);
taskRoute.get("/:creatorId", taskController.getByCreatorId);
taskRoute.post("/", taskController.create);
