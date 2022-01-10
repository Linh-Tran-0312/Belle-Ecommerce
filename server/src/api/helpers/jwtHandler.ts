import jwt from "jsonwebtoken";
import  dotenv  from "dotenv";
dotenv.config();
export interface ITokenPayload {
    id: number,
    role: string
}
 
export const signAccessToken = (payload: ITokenPayload, time: number | string): string => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: time});
    
}
export const signRefreshToken = (payload: ITokenPayload,  time: number | string): string => {
    return jwt.sign(payload,  process.env.REFRESH_TOKEN_SECRET!, { expiresIn: time});
    
}
