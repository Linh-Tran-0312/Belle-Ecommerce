import { OperationalError } from "../helpers/OperationalError";
import { HttpCode } from "../helpers/HttpCode";
import express from "express";
import { SimpleConsoleLogger } from "typeorm";
interface IError {
    status?: number;
    message?: string;
}

const getErrorBody = (err: unknown) => {
     if(err instanceof OperationalError ) return { message: err.message, status: err.status}
     console.log(err)
     return { message: "UNKNOWN_ERROR_1", status: HttpCode.INTERNAL_SERVER_ERROR,}
}

export function errorHandler(err: IError, _req: express.Request, res: express.Response, next: express.NextFunction) {
    if(res.headersSent) return next(err);
    const body = getErrorBody(err);
    res.status(body.status).json(body)
}