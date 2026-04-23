import { Request, Response, NextFunction } from "express";
import { Role } from "../../domain/entities/enums/role";
import { ForbiddenException, UnauthorizedException } from "../../domain/exceptions/app-exceptions";

export function requireRole(...allowedRoles: Role[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) return next(new UnauthorizedException("User not authenticated"));

        if (!allowedRoles.includes(req.user.role)) {
            return next(new ForbiddenException("User not allowed"));
        }

        next();
    };
};