import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Not } from "typeorm";
import { UserService } from ".";
import { HttpCode } from "../helpers/HttpCode";
import { signAccessToken, signRefreshToken } from "../helpers/jwtHandler";
import { OperationalError, OperationalErrorMessage } from "../helpers/OperationalError";
import { TokenError } from "../helpers/TokenError";
import { IUserAuth, UserMapper } from "../mappers";
import { IUser, IUserCreateProps } from "../models";

dotenv.config();

  export interface IRefreshToken {
      refreshToken: string
  }
  export interface IAccessToken {
      token: string;
  }
  export interface IRefreshMessage {
      message : string
  }
  export interface IAuth {
     refreshToken: string,
     accessToken: string,
     profile: IUserAuth
  }
export interface IAuthService {
    register(data: IUserCreateProps): Promise<IAuth>;
    login(email: string, password: string): Promise<IAuth>;
    adminLogin(email: string, password: string): Promise<IAuth>;
    refreshAccessToken(data: IRefreshToken): Promise<IAccessToken>
}
export class AuthService extends UserService {
    constructor() {
        super()
    }
    public async register(data: IUserCreateProps): Promise<IAuth> {       
        const existingEmail = await super.isEmailExist(data.email);
        if(!!existingEmail) throw new OperationalError(OperationalErrorMessage.EMAIL_INUSE, HttpCode.BAD_REQUEST);          
        const hashPassword = await bcrypt.hash(data.password, 10);
        data.password = hashPassword;
        const user = await this.repository.create(data);
     
        const accessToken = signAccessToken({ id: user.id, role: user.role!}, 300); // expire in 5 minute
        const refreshToken = signRefreshToken({id: user.id,role: user.role!}, 604800000); // expire in 7 days
        await this.repository.create({...user, token: refreshToken});

        const result = { accessToken, refreshToken, profile: UserMapper.toUserAuth(user)}
        return result;
    }
    public async login(email: string, password: string): Promise<IAuth> {
        const existingUser: IUser|any =  await this.repository.findOne({ where: { email }});
        if(!existingUser) throw new OperationalError(OperationalErrorMessage.EMAIL_NOTFOUND, HttpCode.BAD_REQUEST);   
       
        const match = await bcrypt.compare(password, existingUser.password);
        if(!match) throw new OperationalError(OperationalErrorMessage.PASSWORD_WRONG, HttpCode.UNAUTHORIZED);
      
        const accessToken = signAccessToken({ id: existingUser.id, role: existingUser.role}, 300); // expire in 5 minute
        const refreshToken = signRefreshToken({id: existingUser.id,role:  existingUser.role }, "7d"); // expire in 7 days
        await this.repository.create({...existingUser, token: refreshToken});
 
        const result = { accessToken, refreshToken, profile: UserMapper.toUserAuth(existingUser)}
        return result;
    }
    public async adminLogin(email: string, password: string): Promise<IAuth> {
        
            const existingUser: IUser|any =  await this.repository.findOne({ where: { email, role: Not("customer") }});
            if(!existingUser) throw new OperationalError(OperationalErrorMessage.EMAIL_NOTFOUND, HttpCode.BAD_REQUEST);   
           
            const match = await bcrypt.compare(password, existingUser.password);
            if(!match) throw new OperationalError(OperationalErrorMessage.PASSWORD_WRONG, HttpCode.UNAUTHORIZED);
            const accessToken = await signAccessToken({ id: existingUser.id, role: existingUser.role}, 300); // expire in 5min
            const refreshToken = await signRefreshToken({id: existingUser.id, role: existingUser.role}, "7d"); // expire in 7 days
            await this.repository.create({...existingUser, token: refreshToken});
          
            const result = { accessToken, refreshToken, profile:  UserMapper.toUserAuth(existingUser)}     
            return result;
     
      
    }
    public async refreshAccessToken(data: IRefreshToken): Promise<IAccessToken> {
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

 