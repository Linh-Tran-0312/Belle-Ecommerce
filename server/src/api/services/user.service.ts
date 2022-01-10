 
import bcrypt from "bcrypt";
import dotenv from "dotenv";
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
    search?: string;
    role?: UserRole;
    sort?: string;
    change?: Change;
    limit: number;
    page: number
}
 
export interface IUserUpdateProps {
    lname?: string;
    fname?: string;
    password?: string;
    email?: string;
    phone?: string;
    address?: string;
    role?: UserRole
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
 
    public async getUsers(query: IUserQuery): Promise<IUsers> {
        return this.repository.getUsers(query);
    }
    public async createUser(data: IUserCreateProps): Promise<IUser> {
        const existingUsers: IUser|any = await this.isEmailExist(data.email);
        if(!!existingUsers) throw new OperationalError(OperationalErrorMessage.EMAIL_INUSE, HttpCode.BAD_REQUEST);
        const hashPassword = await bcrypt.hash(data.password, 10);
        data.password = hashPassword;
        const result: IUser = await this.repository.create(data);
        const user  = await this.getOneById(result.id ["orders"]);
        return user
    }
    public async updateUser(id: number,data: IUserUpdateProps): Promise<IUser> {
        const existingUser: IUser|any =  await this.repository.findOne({ where: { email: data.email }});
        if(!!existingUser && existingUser.id !== id) {
            throw new OperationalError(OperationalErrorMessage.EMAIL_INUSE, HttpCode.BAD_REQUEST);
        } 
        const result: IUser = await this.repository.update(id,data);
        const user  = await this.getOneById(result.id ["orders"]);        
        return user;
    }


}