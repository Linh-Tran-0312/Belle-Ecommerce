import { EventSubscriber,EntitySubscriberInterface, UpdateEvent } from "typeorm";
import { Order, Status, OrderDetail,ProductVariant } from "../models";
@EventSubscriber()
class OrderSubscriber implements EntitySubscriberInterface<Order> {
    listenTo() {
        return Order;
    }
    // update stock quantities when status of order is updated to "delivery" status
        async afterUpdate(event: UpdateEvent<Order>) {
        if(event?.entity?.status === Status.DELIVERY) {
            const orderRepo = event.manager.getRepository(Order);
            const variantRepo = event.manager.getRepository(ProductVariant)
            const order = await orderRepo.findOne({ where: { id: event.entity.id}, relations: ["details"]});
            order?.details.forEach(async(item) => {
              await  variantRepo.createQueryBuilder("productVariant")
                            .update()
                            .set({ quantity: () =>`quantity - ${item.quantity}`})
                            .where("id = :id", { id: item.productVariantId })
                            .execute()
            })
        }  
    }
   
}
export default OrderSubscriber