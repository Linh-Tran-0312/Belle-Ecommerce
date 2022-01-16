
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { HttpCode } from "../helpers/HttpCode";
import { OperationalError, OperationalErrorMessage } from "../helpers/OperationalError";
import { UserRole, User } from "../models";
import { UserRepository ,IUserRepository} from "../repositories";
import { BaseService, IBaseService } from "./base.service";
import { Change, IOrderBasicProps } from "./index";
import { ValidateUserCreateModel, ValidateUserUpdateModel} from "../validations"
import { OrderMapper, UserMapper } from "../mappers";
import { Service } from "typedi";

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

export interface IUserAuth {
    id: number,
    fname: string,
    lname: string,
    phone: string,
   address: string,
   role: UserRole
}
// basic user info nested in other relations
export interface IUserName {
    id: number,
    fname: string,
    lname: string,
}
// data returned when admin searching
export interface IUserSearchProps {
    id: number,
    fname: string,
    lname: string,
    phone: string,
    address: string,
    email: string,
    role: UserRole,
    createdAt: Date,
    sale: number
}

// data returned when create or update user
export interface IUserWithOrders {
    id: number,
    fname: string,
    lname: string,
    phone: string,
    address: string,
    email: string,
    role: UserRole,
    createdAt: Date,
    orders?: IOrderBasicProps[]
}


export interface IUsers {
    users: IUserSearchProps[],
    total: number
}
export interface IUserService extends IBaseService<User> {
    isEmailExist(email: any): Promise<boolean>;
    getUsers(query: IUserQuery): Promise<IUsers>;
    getUserById(id: number): Promise<IUserWithOrders>;
    createUser(data: ValidateUserCreateModel): Promise<IUserWithOrders>;
    updateUser(id: number, data: ValidateUserUpdateModel): Promise<IUserWithOrders> 
}
@Service()
export class UserService extends BaseService<User, IUserRepository> implements IUserService   {
    constructor(
        userRepo: UserRepository
    ) {
        super(userRepo)
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
    public async createUser(data: ValidateUserCreateModel): Promise<IUserWithOrders> {
        const existingUsers = await this.isEmailExist(data.email);
        if (!!existingUsers) throw new OperationalError(OperationalErrorMessage.EMAIL_INUSE, HttpCode.BAD_REQUEST);
        const hashPassword = await bcrypt.hash(data.password, 10);
        data.password = hashPassword;
        const result = await this.repository.create(data);
        return await this.getUserById(result.id);
        
    }
    public async updateUser(id: number, data: ValidateUserUpdateModel): Promise<IUserWithOrders> {
        const existingUser = await this.repository.findOne({ where: { email: data.email } });
        if (!!existingUser && existingUser.id !== id) {
            throw new OperationalError(OperationalErrorMessage.EMAIL_INUSE, HttpCode.BAD_REQUEST);
        }
        const result = await this.repository.update(id, data);
        return await this.getUserById(result.id);
    }


}