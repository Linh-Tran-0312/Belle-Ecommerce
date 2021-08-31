import { BasicOrder } from "./order.interface";

export interface BasicOrderDetail {
    id: string,
}

export interface OrderDetail extends BasicOrderDetail {
    orderId: BasicOrder,
    productVariantId: string,
    quantity: number,
    unitPrice: number,
    subTotal: number
}