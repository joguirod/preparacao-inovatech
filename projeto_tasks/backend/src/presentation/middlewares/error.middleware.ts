import { Request, Response, NextFunction } from "express" 
import { AppException } from "../../domain/exceptions/app-exceptions"

export function errorMiddleware(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {  
    if (err instanceof AppException) {
        return res.status(err.statusCode).json({
            error: err.message
        });
    }

    return res.status(500).json({
        error: "Internal Server Error"
    });
}
