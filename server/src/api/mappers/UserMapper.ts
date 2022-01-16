import { IUserWithOrders } from "../services";
import { UserRole, User } from "../models";

export interface IUserAuth {
    id: number,
    fname: string,
    lname: string,
    email: string,
    phone?: string,
   address?: string,
   role?: UserRole
}
export interface IUserName {
    id: number,
    fname: string,
    lname: string,
}
export class UserMapper {

    public static toUserAuth(user: User): IUserAuth {
        return ({
            id: user.id,
            fname: user.fname,
            lname: user.lname,
            email: user.email,
            phone: user.phone,
            address: user.address,
            role: user.role
        })
    }

    public static toUserName(user: User): IUserName {
        return ({
            id: user.id,
            fname: user.fname,
            lname: user.lname
        })
    }

    public static toUserBasicProps(user: User): IUserWithOrders {
          return {
            id: user.id,
            fname: user.fname,
            lname: user.lname,
            phone: user.phone!,
            email: user.email,
            address: user.address!,
            role: user.role,
            createdAt: user.createdAt,
            orders: [] 
          }
    }

}