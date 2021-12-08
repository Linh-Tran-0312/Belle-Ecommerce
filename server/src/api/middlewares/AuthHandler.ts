import * as express from "express";
import * as jwt from "jsonwebtoken";
import { OperationalError, OperationalErrorMessage } from "../helpers/OperationalError";
import { HttpCode } from "../helpers/HttpCode";
import dotenv from "dotenv";
dotenv.config();
export function expressAuthentication(request: express.Request, securityName: string, scopes?: string[]): Promise<any> {
/*     if (securityName === "api_key") {
        let token;
        if (request.query && request.query.access_token) {
          token = request.query.access_token;
        }
    
        if (token === "abc123456") {
          return Promise.resolve({
            id: 1,
            name: "Ironman",
          });
        } else {
          return Promise.reject({});
        }
      }
     */
    if (securityName === "jwt") {
     
        return new Promise((resolve, reject) => {
            let token = request.headers.authorization as string;
         
            if (!token) {

                reject(new OperationalError(OperationalErrorMessage.NO_TOKEN, HttpCode.UNAUTHORIZED));
            }
            token = token.replace("Bearer ", "");
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "secret", function (err: any, decoded: any) {
                if (err) {
                    console.error(err.toString());
                    reject(new OperationalError(OperationalErrorMessage.EXPIRED_TOKEN, HttpCode.UNAUTHORIZED));
                } else {
                    // Check if JWT contains all required scopes
                    if (scopes && !scopes.includes(decoded.role)) {
                        reject(new OperationalError(OperationalErrorMessage.UNAUTHORIZED, HttpCode.FORBIDDEN));
                    }

                    resolve(decoded);
                }
            });
        });

    }
    return Promise.reject({});

}