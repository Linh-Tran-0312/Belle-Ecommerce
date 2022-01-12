
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { HttpCode } from "../helpers/HttpCode";
import { OperationalError, OperationalErrorMessage } from "../helpers/OperationalError";
import { IUser, UserRole, User } from "../models";
import { UserRepository ,IUserRepository} from "../repositories";
import { BaseService, IBaseService } from "./base.service";
import { Change } from "./index";
import { IUserSearchProps, IUserCreateProps, IUserUpdateProps, IUserWithOrders, IOrderBasicProps } from "../interfaces";
import { OrderMapper, UserMapper } from "../mappers";
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


export interface IUsers {
    users: IUserSearchProps[],
    total: number
}
export interface IUserService extends IBaseService<User> {
    isEmailExist(email: any): Promise<boolean>;
    getUsers(query: IUserQuery): Promise<IUsers>;
    getUserById(id: number): Promise<IUserWithOrders>;
    createUser(data: IUserCreateProps): Promise<IUserWithOrders>;
    updateUser(id: number, data: IUserUpdateProps): Promise<IUserWithOrders> 
}
export class UserService extends BaseService<User, IUserRepository> implements IUserService   {
    constructor() {
        super(new UserRepository())
    }

    public async isEmailExist(email: any): Promise<boolean> {
        const existingEmail = await this.repository.findOne({ where: { email } });
        if (!existingEmail) return false;
        return true;
    }

    public async getUsers(query: IUserQuery): Promise<IUsers> {
        return this.repository.getUsers(query);
    }
    public async getUserById(id: number): Promise<IUserWithOrders> {
        let user = await this.getOneById(id,["orders"]);
        let result: IUserWithOrders = UserMapper.toUserBasicProps(user);
        user.orders?.forEach(o =>  result?.orders?.push(OrderMapper.toBasicProps(o)));
        return result;
    }
    public async createUser(data: IUserCreateProps): Promise<IUserWithOrders> {
        const existingUsers: IUser | any = await this.isEmailExist(data.email);
        if (!!existingUsers) throw new OperationalError(OperationalErrorMessage.EMAIL_INUSE, HttpCode.BAD_REQUEST);
        const hashPassword = await bcrypt.hash(data.password, 10);
        data.password = hashPassword;
        const result: IUser = await this.repository.create(data);
        /*let user = await this.getOneById(result.id,["orders"]);
        let orders: IOrderBasicProps[];
        user.orders?.forEach(o => orders.push(OrderMapper.toBasicProps(o)));
        let newUser: IUserWithOrders = UserMapper.toUserBasicProps(user) */

        return await this.getUserById(result.id);
        
    }
    public async updateUser(id: number, data: IUserUpdateProps): Promise<IUserWithOrders> {
        const existingUser: IUser | any = await this.repository.findOne({ where: { email: data.email } });
        if (!!existingUser && existingUser.id !== id) {
            throw new OperationalError(OperationalErrorMessage.EMAIL_INUSE, HttpCode.BAD_REQUEST);
        }
        const result: IUser = await this.repository.update(id, data);
        return await this.getUserById(result.id);
    }


}