import { IOrderBasicProps, IItemDetails } from "../services";
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
        imgPaths: item.productVariant.product.imgPaths,
        brand: item.productVariant.product.brand.name,
        color:item.productVariant.color.name,
        size: item.productVariant.size.name,
      }
    }
  }
}