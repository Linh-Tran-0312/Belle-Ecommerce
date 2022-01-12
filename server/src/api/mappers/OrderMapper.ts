import { IOrderBasicProps } from "../interfaces";
import { IOrder } from "../models";

export class OrderMapper {

  public static toBasicProps(order: IOrder): IOrderBasicProps {
      return {
        id:order.id,
        status: order.status,
        paymentMethod: order.paymentMethod,
        paymentCheck: order.paymentCheck,
        address: order.address,
        total: order.total,
        shipping: order.shipping!,
        orderAt: order.orderAt,
      }
  }
}