import jwt from "jsonwebtoken"
import { Role } from "../../domain/entities/enums/role";

const SECRET = "inovatech-prova-2026"
const EXPIRES_IN = "15m"

export interface JwtPayload {
    userId: string;
    email: string;
    role: Role;
}

export class JwtProvider {
    generate(payload: JwtPayload): string {
        return jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN });
    }

    verify(token: string): JwtPayload {
        return jwt.verify(token, SECRET) as JwtPayload;
    }
}

export const jwtProvider = new JwtProvider();