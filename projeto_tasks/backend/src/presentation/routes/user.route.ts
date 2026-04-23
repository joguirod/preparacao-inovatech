import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { requireRole } from "../middlewares/role.middleware";
import { Role } from "../../domain/entities/enums/role";

export const userRoute = Router();

userRoute.use(requireRole(Role.ADMIN));

userRoute.get("/", userController.listAll);
userRoute.get("/:id", userController.findById);
