 
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { IUserUpdateProps } from "../controllers/userController";
import { HttpCode } from "../helpers/HttpCode";
import { OperationalError, OperationalErrorMessage } from "../helpers/OperationalError";
import { IUser, IUserCreateProps, UserRole} from "../models";
import { UserRepository, IUsers  } from "../repositories";
import { BaseService, IBaseService } from "./base.service";
import { Change } from "./index";
dotenv.config();
 
export enum UserField {
    NAME = "fname",
    SALE = "sale",
    CREATEDAT = "createdAt"
}
export interface IUserQuery {
    search: string;
    role: UserRole;
    sort: string;
    change: Change;
    limit: number;
    page: number
}
export interface IUserAuth {
    accessToken: string;
    refreshToken: string;
    profile: IUser
}
export class UserService extends BaseService<IUser, UserRepository> implements IBaseService<IUser>  {
    constructor() {
        super(new UserRepository())
    }

    protected async  isEmailExist(email: any): Promise<boolean> {
        const existingEmail = await this.repository.findOne({ where: { email }});
        if(!existingEmail) return false;
        return true;
    }
  /*   public async register(data: IUserCreateProps): Promise<IUserAuth> {       
        //const existingUsers: IUser| any =  await this.repository.findOne({ where: { email: data.email}});
        const existingEmail = await this.isEmailExist(data.email);
        if(!!existingEmail) throw new OperationalError(OperationalErrorMessage.EMAIL_INUSE, HttpCode.BAD_REQUEST);          
        const hashPassword = await bcrypt.hash(data.password, 10);
        data.password = hashPassword;
        const profile = await this.repository.create(data);
     
        const accessToken = signAccessToken({ id: profile.id, role: profile.role}, 3600); // expire in 1 minute
        const refreshToken = await signRefreshToken({id: profile.id}, 604800000); // expire in 7 days
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
        const refreshToken = await signRefreshToken({id: existingUser.id}, 604800000); // expire in 7 days
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
            const accessToken =  signAccessToken({ id: existingUser.id, role: existingUser.role}, 3600); // expire in 1 hour
            const refreshToken =  signRefreshToken({id: existingUser.id}, 604800); // expire in 7 days
            await this.repository.create({...existingUser, token: refreshToken});
            delete existingUser.password;
            delete existingUser.token;        
            const result = { accessToken, refreshToken, profile: existingUser}     
            return result;
     
      
    }
    public async revokeAccessToken(data: IRefreshToken): Promise<IAccessToken> {
        const {refreshToken } = data;
        let token = "";
        if(!refreshToken) throw new OperationalError(OperationalErrorMessage.NO_TOKEN, HttpCode.BAD_REQUEST);
        await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, async(err , decoded ) => {
            if(err)  throw new OperationalError(OperationalErrorMessage.INVALID_TOKEN, HttpCode.BAD_REQUEST);
          
            const user =  await this.repository.findOne({ where: { id : decoded?.id}});
            if(refreshToken === user?.token )
            {
                token = signAccessToken({ id: decoded?.id, role: user?.role}, 60);
            } else {
                throw new OperationalError(OperationalErrorMessage.INVALID_TOKEN, HttpCode.BAD_REQUEST);
            }
         })

         return { token }
    }  
 
    } */
    public async getUsers(query: IUserQuery): Promise<IUsers> {
        return this.repository.getUsers(query);
    }
    public async createUser(data: IUserCreateProps): Promise<IUser> {
        const existingUsers: IUser|any = await this.isEmailExist(data.email);
        if(!!existingUsers) throw new OperationalError(OperationalErrorMessage.EMAIL_INUSE, HttpCode.BAD_REQUEST);
        const hashPassword = await bcrypt.hash(data.password, 10);
        data.password = hashPassword;
        const result: IUser = await this.repository.create(data);
        const user: IUser|any = await this.repository.findOne({ where: {id: result.id}, relations: ["orders"]});
        return user
    }
    public async updateUser(id: number,data: IUserUpdateProps): Promise<IUser> {
        if(!!data.email) {
            const existingUser: IUser|any =  await this.repository.findOne({ where: { email: data.email }});
            if(!!existingUser && existingUser.id !== id) {
                throw new OperationalError(OperationalErrorMessage.EMAIL_INUSE, HttpCode.BAD_REQUEST);
            } 
        }
        const result: IUser = await this.repository.update(id,data);
        const user: IUser|any = await this.repository.findOne({ where: {id: result.id}, relations: ["orders"]});
        
        return user;
    }


}