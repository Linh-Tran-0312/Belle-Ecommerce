import jwt from "jsonwebtoken";
import  dotenv  from "dotenv";
dotenv.config();
interface IAccessTkPayload {
    id: number,
    role?: string
}
interface IRefreshTkPayload {
    id: number
}
export const signAccessToken = (payload: IAccessTkPayload, time: number): string => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: time});
    
}
export const signRefreshToken = (payload: IRefreshTkPayload,  time: number): string => {
    return jwt.sign(payload,  process.env.REFRESH_TOKEN_SECRET!, { expiresIn: time});
    
}
