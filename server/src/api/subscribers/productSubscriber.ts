import { EntitySubscriberInterface, EventSubscriber, UpdateEvent } from "typeorm";
import { OrderDetail, Product, Status } from "../models";

@EventSubscriber()
export class ProductSubscriber implements EntitySubscriberInterface<Product> {
    listenTo() {
        return Product;
    }
    //update unit price of items in pending orders when product price change
        async afterUpdate(event: UpdateEvent<Product>) {

            const productRepo = event.manager.getRepository(Product);
            const currentPro = await productRepo.findOne({
                select: ["id","price"],
                where: {
                    id: event?.entity?.id
                }
            })
            // if the price change
            if(currentPro?.price !== event?.entity?.price) {
                const detailRepo = event.manager.getRepository(OrderDetail);
                const items = await detailRepo.find({
                   select: ["id","unitPrice", "orderId","quantity"],
                   relations: ["order","productVariant","productVariant.product"],
                   where: {
                       order: {
                           status: Status.ORDERING
                       },
                       productVariant: {
                           product: {
                               id:  event?.entity?.id
                           }
                       }
                   }
               })
   
               items.forEach(item => item.unitPrice = event?.entity?.price);
               
               // create a transaction for orderDetailSubscriber not to update total of related orders until this transaction commit
               await event.queryRunner.startTransaction();
               try {
                   await detailRepo.save(items);
                   await event.queryRunner.commitTransaction();
               } catch (error) {
                   await event.queryRunner.rollbackTransaction();
               }finally {
                   //release query runner which is manually created:
                   await event.queryRunner.release();
               }  
            }
       
   }      
}
export default ProductSubscriber