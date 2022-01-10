import { IUser, UserRole } from "../models";

export interface IUserAuth {
    id: number,
    fname: string,
    lname: string,
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

    public static toUserAuth(user: IUser): IUserAuth {
        return ({
            id: user.id,
            fname: user.fname,
            lname: user.lname,
            phone: user.phone,
            address: user.address,
            role: user.role
        })
    }

    public static toUserName(user: IUser): IUserName {
        return ({
            id: user.id,
            fname: user.fname,
            lname: user.lname
        })
    }

}