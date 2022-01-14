import { IOrderBasicProps, IItemDetails, IOrderInfo } from "../services";
import { Order, OrderDetail } from "../models";

export class OrderMapper {

  public static toBasicProps(order: Order): IOrderBasicProps {
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
  public static toItemsDetails( item: OrderDetail): IItemDetails {
    return {
      id: item.id,
      orderId: item.orderId,
      quantity: item.quantity,
      unitPrice:item.unitPrice,
      productVariantId: item.productVariantId,
      product: {
        id: item.productVariant.productId,
        name: item.productVariant.product.name,
        imgPaths: item.productVariant.product.imgPaths,
        brand: item.productVariant.product.brand.name,
        color:item.productVariant.color.name,
        size: item.productVariant.size.name,
      }
    }
  }
  public static toOrderInfo(order: Order): IOrderInfo {
    const details = order.details.map(detail => this.toItemsDetails(detail))
    return {
      id: order.id,
      status: order.status,
      shipping: order.shipping,
      paymentMethod: order.paymentMethod,
      paymentCheck: order.paymentCheck,
      total: order.total,
      address: order.address,
      note: order.note,
      orderAt: order.orderAt,
      user: {
        id: order.user.id,
        fname: order.user.fname,
        lname: order.user.lname,
        phone: order.user.phone,
        address: order.user.address,
        role: order.user.role
      },
      details: [...details]
    }
  }
}