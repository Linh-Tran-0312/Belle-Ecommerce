 
import bcrypt from "bcrypt";
import { IUserUpdateProps } from "../controllers/userController";
import { HttpCode } from "../helpers/HttpCode";
import { OperationalError, OperationalErrorMessage } from "../helpers/OperationalError";
import { IUser, IUserCreateProps, UserRole } from "../models";
import { IUsers, UserRepository } from "../repositories";
import { BaseService, IBaseService } from "./base.service";
import { Change } from "./index";
 
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

export class UserService extends BaseService<IUser, UserRepository> implements IBaseService<IUser>  {
    constructor() {
        super(new UserRepository())
    }

    private async  isEmailExist(email: any): Promise<boolean> {
        const existingEmail = await this.repository.findOne({ where: { email }});
        if(!existingEmail) return false;
        return true;
    }
    public async register(data: IUserCreateProps): Promise<IUser> {       
        //const existingUsers: IUser| any =  await this.repository.findOne({ where: { email: data.email}});
        const existingEmail = await this.isEmailExist(data.email);
        if(!!existingEmail) throw new OperationalError(OperationalErrorMessage.EMAIL_INUSE, HttpCode.BAD_REQUEST);          
        const hashPassword = await bcrypt.hash(data.password, 10);
        data.password = hashPassword;
        const result = await this.repository.create(data);
        delete result.password;
        return result;
    }

    public async login(email: string, password: string): Promise<IUser> {
        const existingUsers: IUser|any = await this.isEmailExist(email);
        if(!existingUsers) throw new OperationalError(OperationalErrorMessage.EMAIL_NOTFOUND, HttpCode.BAD_REQUEST);   
        console.log(existingUsers);
        const match = await bcrypt.compare(password, existingUsers.password);
        if(!match) throw new OperationalError(OperationalErrorMessage.PASSWORD_WRONG, HttpCode.UNAUTHORIZED);
        delete existingUsers.password;
        return existingUsers
    }

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
                console.log(existingUser);
                console.log(id, typeof id);
                console.log(existingUser.id, typeof existingUser.id);
                throw new OperationalError(OperationalErrorMessage.EMAIL_INUSE, HttpCode.BAD_REQUEST);
            } 
        }
        console.log("user service");
        const result: IUser = await this.repository.update(id,data);
        const user: IUser|any = await this.repository.findOne({ where: {id: result.id}, relations: ["orders"]});
        
        return user;
    }


}