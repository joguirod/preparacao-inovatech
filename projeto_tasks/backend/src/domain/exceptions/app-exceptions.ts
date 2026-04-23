export class AppException extends Error {
    constructor(public statusCode: number, message: string) {
        super(message);
    }
}

export class BadRequestException extends AppException {
    constructor(message = "Invalid request") {
        super(400, message);
    }
}

export class UnauthorizedException extends AppException {
    constructor(message = "Unauthorized request") {
        super(401, message);
    }
}

export class ForbiddenException extends AppException {
    constructor(message = "User not allowed") {
        super(401, message);
    }
}

export class NotFoundException extends AppException {
    constructor(message = "Resource not found") {
        super(404, message);
    }
}

export class ConflictException extends AppException {
    constructor(message = "Conflicting data") {
        super(409, message);
    }
}