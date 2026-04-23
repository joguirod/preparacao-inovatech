import { NextFunction, Request, Response } from "express";
import { jwtProvider } from "../../infra/auth/jwt.provider";
import { ForbiddenException, UnauthorizedException } from "../../domain/exceptions/app-exceptions";
import { Role } from "../../domain/entities/enums/role";

declare global {
    namespace Express {
        interface Request {
            user?: { userId: string, email: string, role: Role };
        }
    }
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const header = req.headers.authorization;
        if (!header || !header.startsWith("Bearer ")) {
            throw new UnauthorizedException("Authorization Token invalid or not found");
        }

        const token = header.split(" ")[1];
        const payload = jwtProvider.verify(token);
        req.user = payload;

        next();
    } catch (err) {
        next(new UnauthorizedException("Invalid or expired token"));
    }
}