import { IOrder, IOrderCreateProps, Order, OrderDetail, IOrderDetail, Status } from "../models";
import { OrderRepository } from "../repositories";
import { BaseService, IBaseService } from "./base.service";

import { IOrderUpdateItems } from "../controllers/orderController";

//@Service({ id: "OrderRepository-service"})
export class OrderService extends BaseService<IOrder, OrderRepository> implements IBaseService<IOrder>  {
    constructor() {
        super(new OrderRepository())
    }
    public async createOrder(data: IOrderCreateProps): Promise<IOrder> {
        try {
            let order = new Order();
            console.log(order);
            order.userId = data.userId;
            order.details = [];
            data.details?.forEach(detail => {
                const item = new OrderDetail();
                item.productVariantId = detail.productVariantId;
                item.quantity = detail.quantity;
                item.unitPrice = detail.unitPrice;
                order.details = [...order.details, item];
            })
            return this.repository.create(order);
          
        } catch (error) {
            console.log(error);
            throw error;
        }
       
    }
    public async updateOrder(id: number, data: IOrderUpdateItems ): Promise<IOrder> {
        try {
            const currentOrder: IOrder | any = await super.getOneById(id, ["details"]);
            console.log(currentOrder);
            data.details.forEach(detail => {
               const index = currentOrder.details.findIndex((item: { productVariantId: number; }) => item.productVariantId === detail.productVariantId);
               if(index === -1) {
                   const newItem = new OrderDetail();
                   newItem.productVariantId = detail.productVariantId;
                   newItem.quantity = detail.quantity;
                   newItem.unitPrice = detail.unitPrice;
                   currentOrder.details.push(newItem);
               } else {
                   currentOrder.details[index].quantity += detail.quantity;
               }
               
            })
            return this.repository.create(currentOrder);
    
        } catch (error) {
            console.log(error);
            throw error;
        }
    
    }
    public async getCurrentOrderByUserId(userId: number): Promise<IOrder | null> {
            const options = {
                where: {
                    userId,
                    status: Status.ORDERING
                },
                relations: ["details",
                            "details.productVariant",
                            "details.productVariant.product",
                            "details.productVariant.size",
                            "details.productVariant.color"
                        ]
            }
        const order = await this.repository.findOne(options);
       if(!order) return null;
       return order;
    
    }
    public async getAllOrdersByUserId(userId: number): Promise<IOrder[]> {
       const options = {
           where: {
               userId
           },
           relations: ["details",
           "details.productVariant",
           "details.productVariant.product",
           "details.productVariant.size",
           "details.productVariant.color"
       ]
       }
        return this.repository.find(options)
    }
}