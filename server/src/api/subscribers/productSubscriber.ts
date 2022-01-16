import { EventSubscriber,EntitySubscriberInterface, UpdateEvent, In } from "typeorm";
import { Product, Status, ProductVariant, OrderDetail } from "../models";
@EventSubscriber()
export class ProductSubscriber implements EntitySubscriberInterface<Product> {
    listenTo() {
        return Product;
    }
    //update unit price of items in pending orders when product price change
        async afterUpdate(event: UpdateEvent<Product>) {

            const detailRepo = event.manager.getRepository(OrderDetail)
            const items = await detailRepo.find({
                select: ["id","unitPrice"],
                relations: ["order","productVariant"],
                where: {
                    order: {
                        status: Status.ORDERING
                    },
                    productVariant: {
                        productId: event?.entity?.id
                    }
                }
            })
            items.forEach(item => {
                item.unitPrice = event?.entity?.price
            })
            await  detailRepo.save(items)
            /*   createQueryBuilder("orderDetail")
            .update()
            .set({ unitPrice: event?.entity?.price })
            .where({id: In(ids)})
            .execute() */
   }      
}
export default ProductSubscriber