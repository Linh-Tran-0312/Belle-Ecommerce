import { EventSubscriber,EntitySubscriberInterface, UpdateEvent } from "typeorm";
import { Order, Status, OrderDetail,ProductVariant } from "../models";
@EventSubscriber()
class OrderDetailSubscriber implements EntitySubscriberInterface<OrderDetail> {
    listenTo() {
        return OrderDetail;
    }
    // update total of order when updating item quantities 
        async afterUpdate(event: UpdateEvent<OrderDetail>) {
            const orderRepo = event.manager.getRepository(Order);
            const detailRepo = event.manager.getRepository(OrderDetail);
            const details = await detailRepo.find({where: {
                orderId: event?.entity?.orderId
            }});
            const sum = details.reduce((preSum, item) => preSum + item.quantity*item.unitPrice,0)
           await orderRepo.update(event?.entity?.orderId,{ total: sum})
    }
   
}
export default OrderDetailSubscriber