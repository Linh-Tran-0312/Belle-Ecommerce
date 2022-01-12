import { Status, PaymentMethod } from "../models";
import { IUserName } from ".";
export interface IOrderBasicProps {
    id: number,
    status: Status,
    paymentMethod: PaymentMethod,
    paymentCheck: boolean,
    address: string,
    total:number,
    shipping?: number,
    orderAt: Date,
}

export interface IOrderSearchProps extends IOrderBasicProps {
    user: IUserName
}