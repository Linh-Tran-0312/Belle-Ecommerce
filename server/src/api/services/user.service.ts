 
import { User, IUser, IUserCreateProps, UserRole} from "../models";
import { UserRepository, IUsers } from "../repositories";
import { Change } from "./index";
import { BaseService, IBaseService } from "./base.service";
import bcrypt from "bcrypt";
import { ServiceResponse } from "../helpers/ServiceResponse";
import { HttpCode } from "../helpers/HttpCode";
import { OperationalError, OperationalErrorMessage } from "../helpers/OperationalError";
import { ILike } from "typeorm";

 
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

    public async register(data: IUserCreateProps): Promise<IUser> {       
        const existingUsers: IUser| any =  await this.repository.findOne({ where: { email: data.email}});
        if(existingUsers) throw new OperationalError(OperationalErrorMessage.EMAIL_INUSE, HttpCode.BAD_REQUEST);          
        const hashPassword = await bcrypt.hash(data.password, 10);
        data.password = hashPassword;
        const result = await this.repository.create(data);
        delete result.password;
        return result;
    }

    public async login(email: string, password: string): Promise<IUser> {
        const existingUsers: IUser| any =  await this.repository.findOne({ where: { email}});
        if(!existingUsers) throw new OperationalError(OperationalErrorMessage.EMAIL_NOTFOUND, HttpCode.UNAUTHORIZED);
        console.log(existingUsers);
        const match = await bcrypt.compare(password, existingUsers.password);
        if(!match) throw new OperationalError(OperationalErrorMessage.PASSWORD_WRONG, HttpCode.UNAUTHORIZED);
        delete existingUsers.password;
        return existingUsers
    }

    public async getUsers(query: IUserQuery): Promise<IUsers> {
        return this.repository.getUsers(query);
    }


}