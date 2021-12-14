import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Not } from "typeorm";
import { UserService } from ".";
import { IAccessToken, IRefreshToken } from "../controllers/authController";
import { HttpCode } from "../helpers/HttpCode";
import { signAccessToken, signRefreshToken, ITokenPayload } from "../helpers/jwtHandler";
import { OperationalError, OperationalErrorMessage } from "../helpers/OperationalError";
import { TokenError } from "../helpers/TokenError";
import { IUser, IUserCreateProps } from "../models";
import { IUserAuth } from "./index";
dotenv.config();

export class AuthService extends UserService {
    constructor() {
        super()
    }
    public async register(data: IUserCreateProps): Promise<IUserAuth> {       
        //const existingUsers: IUser| any =  await this.repository.findOne({ where: { email: data.email}});
        const existingEmail = await super.isEmailExist(data.email);
        if(!!existingEmail) throw new OperationalError(OperationalErrorMessage.EMAIL_INUSE, HttpCode.BAD_REQUEST);          
        const hashPassword = await bcrypt.hash(data.password, 10);
        data.password = hashPassword;
        const profile = await this.repository.create(data);
     
        const accessToken = signAccessToken({ id: profile.id, role: profile.role!}, 3600); // expire in 1 minute
        const refreshToken = signRefreshToken({id: profile.id,role: profile.role!}, 604800000); // expire in 7 days
        await this.repository.create({...profile, token: refreshToken});
        delete profile.password;
        delete profile.token;
        const result = { accessToken, refreshToken, profile}
        return result;
    }

    public async login(email: string, password: string): Promise<IUserAuth> {
        const existingUser: IUser|any =  await this.repository.findOne({ where: { email }});
        if(!existingUser) throw new OperationalError(OperationalErrorMessage.EMAIL_NOTFOUND, HttpCode.BAD_REQUEST);   
       
        const match = await bcrypt.compare(password, existingUser.password);
        if(!match) throw new OperationalError(OperationalErrorMessage.PASSWORD_WRONG, HttpCode.UNAUTHORIZED);
      
        const accessToken = signAccessToken({ id: existingUser.id, role: existingUser.role}, 3600); // expire in 1 minute
        const refreshToken = signRefreshToken({id: existingUser.id,role:  existingUser.role }, 604800000); // expire in 7 days
        await this.repository.create({...existingUser, token: refreshToken});
        delete existingUser.password;
        delete existingUser.token;
        const result = { accessToken, refreshToken, profile: existingUser}
        return result;
    }
    public async adminLogin(email: string, password: string): Promise<IUserAuth> {
        
            const existingUser: IUser|any =  await this.repository.findOne({ where: { email, role: Not("customer") }});
            if(!existingUser) throw new OperationalError(OperationalErrorMessage.EMAIL_NOTFOUND, HttpCode.BAD_REQUEST);   
           
            const match = await bcrypt.compare(password, existingUser.password);
            if(!match) throw new OperationalError(OperationalErrorMessage.PASSWORD_WRONG, HttpCode.UNAUTHORIZED);
            const accessToken =  signAccessToken({ id: existingUser.id, role: existingUser.role}, 60); // expire in 1 hour
            const refreshToken =  signRefreshToken({id: existingUser.id, role: existingUser.role}, 120); // expire in 7 days
            await this.repository.create({...existingUser, token: refreshToken});
            delete existingUser.password;
            delete existingUser.token;        
            const result = { accessToken, refreshToken, profile: existingUser}     
            return result;
     
      
    }
    public async revokeAccessToken(data: IRefreshToken): Promise<IAccessToken> {
        const {refreshToken } = data;
        let token = "";
        if(!refreshToken) throw new TokenError(OperationalErrorMessage.NO_TOKEN)
        await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, async(err , decoded ) => {
            if(err) {
                const payload: any = jwt.verify(refreshToken ,process.env.REFRESH_TOKEN_SECRET!, {ignoreExpiration: true});
                throw new TokenError(OperationalErrorMessage.INVALID_TOKEN, payload.role);
            } 
          
            const user =  await this.repository.findOne({ where: { id : decoded?.id}});
            if(refreshToken === user?.token )
            {
                token = signAccessToken({ id: decoded?.id, role: user?.role!}, 60);
            } else {
                throw new TokenError(OperationalErrorMessage.INVALID_TOKEN, decoded?.role);
            }
         })

         return { token }
    }  
}

 