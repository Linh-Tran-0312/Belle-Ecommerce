import * as express from "express";
import * as jwt from "jsonwebtoken";
import { OperationalError, OperationalErrorMessage } from "../helpers/OperationalError";
import { HttpCode } from "../helpers/HttpCode";
import dotenv from "dotenv";
dotenv.config();
export function expressAuthentication(request: express.Request, securityName: string, scopes?: string[]): Promise<any> {

    /* if (securityName === "jwt") {
     
        return new Promise((resolve, reject) => {
            let token = request.headers.authorization as string;
         
            if (!token) {

                reject(new OperationalError(OperationalErrorMessage.NO_TOKEN, HttpCode.UNAUTHORIZED));
            }
            token = token.replace("Bearer ", "");
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, function (err: any, decoded: any) {
                if (err) {
                    reject(new OperationalError(err.toString(), HttpCode.UNAUTHORIZED));
                } else {
                    // Check if JWT contains all required scopes
                    if (scopes && !scopes.includes(decoded.role)) {
                        reject(new OperationalError(OperationalErrorMessage.NOT_PERMISSION, HttpCode.FORBIDDEN));
                    }
                    resolve(decoded);
                }
            });
        });

    } */
 
    if (securityName === "jwt") {
     
      return new Promise((resolve, reject) => {
          let token = request?.cookies?.token;
          if (!token) {
              reject(new OperationalError(OperationalErrorMessage.NO_TOKEN, HttpCode.UNAUTHORIZED));
          }
          jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, function (err: any, decoded: any) {
              if (err) {
                  reject(new OperationalError(err.message.toString(), HttpCode.UNAUTHORIZED));
              } else {
                  // Check if JWT contains all required scopes
                  if (scopes && !scopes.includes(decoded.role)) {
                      reject(new OperationalError(OperationalErrorMessage.NOT_PERMISSION, HttpCode.FORBIDDEN));
                  }
                  resolve(decoded);
              }
          });
      });}
    return Promise.reject({});

}