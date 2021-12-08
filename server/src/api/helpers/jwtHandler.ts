import jwt from "jsonwebtoken";
import  dotenv  from "dotenv";
dotenv.config();

export const signAccessToken = (payload: any, time: number): string => {
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET || "secret", { expiresIn: time});
    return accessToken;
}
export const signRefreshToken = (payload: any,  time: number): string => {
    const refreshToken = jwt.sign(payload,  process.env.REFRESH_TOKEN_SECRET || "secret", { expiresIn: time});
    return refreshToken;
}
