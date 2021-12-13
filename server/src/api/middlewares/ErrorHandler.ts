import { OperationalError } from "../helpers/OperationalError";
import { HttpCode } from "../helpers/HttpCode";
import express from "express";
import { SimpleConsoleLogger } from "typeorm";
import { PostgresError } from "../helpers/PostgresError";
interface IError {
    status?: number;
    message?: string;
    code?: any;
}

const getErrorBody = (err: unknown) => {
     if(err instanceof OperationalError ) return { message: err.message, status: err.status}
     if(err instanceof PostgresError) return  { message: err.message, status: 500, code: err.code}
     return { message: "UNKNOWN_ERROR_1", status: HttpCode.INTERNAL_SERVER_ERROR,}
}

export function errorHandler(err: IError, _req: express.Request, res: express.Response, next: express.NextFunction) {
    if(res.headersSent) return next(err);
    const body = getErrorBody(err);
    console.log(err)
    res.status(body.status).json(body)
}