import { OperationalError, OperationalErrorMessage } from "../helpers/OperationalError";
import { HttpCode } from "../helpers/HttpCode";
import express from "express";
import { PostgresError } from "../helpers/PostgresError";
import { PostgresErrorCode } from "../helpers/PostgresCode";
import { TokenError } from "../helpers/TokenError";
interface IError {
    status?: number;
    message?: string;
    code?: any;
}

const getErrorBody = (err: unknown) => {
     if(err instanceof OperationalError ) return { message: err.message, status: err.status}
     if(err instanceof PostgresError) {
         if(err.code === PostgresErrorCode.FOREIGN_KEY_VIOLATION) return  { message: OperationalErrorMessage.FOREIGN_VIOLATION , status: HttpCode.INTERNAL_SERVER_ERROR}
        return  { message: OperationalErrorMessage.QUERY_ERROR, status: HttpCode.INTERNAL_SERVER_ERROR}
     } 
     if(err instanceof TokenError) return { message: err.message, role: err.role, status: HttpCode.BAD_REQUEST}
     return { message: OperationalErrorMessage.UNKNOWN_ERROR, status: HttpCode.INTERNAL_SERVER_ERROR,}
}

export function errorHandler(err: IError, _req: express.Request, res: express.Response, next: express.NextFunction) {
    if(res.headersSent) return next(err);
    const body = getErrorBody(err);
    console.log(err)
    res.status(body.status).json(body)
}