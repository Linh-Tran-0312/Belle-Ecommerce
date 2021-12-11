import { HttpCode } from "./HttpCode";

export enum OperationalErrorMessage {
    UNKNOWN_ERROR = "Something went wrong",
    EMAIL_INUSE = "This email is already used",
    EMAIL_NOTFOUND = "This email is not registered",
    NOT_FOUND = "Not Found",
    INVALID_EMAIL = "This email is invalid",
    QUERY_ERROR = "Database query failed",
    PASSWORD_WRONG = "Password is not correct",
    NO_TOKEN = "No token provided",
    INVALID_TOKEN= "Invalid token",
    TOKEN_NOT_EXIST = "Token is not in store",
    UNAUTHORIZED = "Unauthorized",
    EXPIRED_TOKEN = "Token is expired",
    NOT_PERMISSION = "You might have not permission to access this resource"
};

export class OperationalError extends Error {
    constructor(message: OperationalErrorMessage, readonly status: HttpCode) {
        super(message)
    }
}



