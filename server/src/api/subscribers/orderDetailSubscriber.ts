import { EventSubscriber,EntitySubscriberInterface, UpdateEvent, InsertEvent } from "typeorm";
import { Order, Status, OrderDetail,ProductVariant } from "../models";
@EventSubscriber()
class OrderDetailSubscriber implements EntitySubscriberInterface<OrderDetail> {
    listenTo() {
        return OrderDetail;
    }
    async updateTotal(event: UpdateEvent<OrderDetail> | InsertEvent<OrderDetail>) {
        const orderRepo = event.manager.getRepository(Order);
        const detailRepo = event.manager.getRepository(OrderDetail);
        const details = await detailRepo.find({where: {
            orderId: event?.entity?.orderId
        }});
        const sum = details.reduce((preSum, item) => preSum + item.quantity*item.unitPrice,0)
       await orderRepo.update(event?.entity?.orderId,{ total: sum})
    }
    // update total of order when updating item quantities 
    async afterUpdate(event: UpdateEvent<OrderDetail>) {
          return await this.updateTotal(event);
    }
    async afterInsert(event: InsertEvent<OrderDetail>) {
        return await this.updateTotal(event);
   }
    
   
}
export default OrderDetailSubscriber