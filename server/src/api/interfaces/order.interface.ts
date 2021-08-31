import { BasicUser } from "./user.interface";

export interface BasicOrder {
    id : string,
}

export interface Order extends BasicOrder {
    userId: BasicUser,
    status: string,
    paymentMethod: string,
    paymentStatus: boolean,
    note: string,
    address: string,
    shipping: number,
    total: number,
    orderAt: string


}