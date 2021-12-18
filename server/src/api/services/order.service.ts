import { IOrder, IOrderCreateProps, Order, OrderDetail, IOrderDetail, IOrderDetailCreateProps, Status, PaymentMethod  } from "../models";
import { OrderRepository, IOrders } from "../repositories";
import { BaseService, IBaseService  } from "./base.service";
import { Change } from "./index";
import { IOrderUpdateItems, IOrderUpdateProps } from "../controllers/orderController";
import { periodCal } from "../helpers/timeHandler";
import { OperationalError, OperationalErrorMessage } from "../helpers/OperationalError";
import { HttpCode } from "../helpers/HttpCode";
export interface IPlaceOrder {
    address: string;
    note?: string;
    paymentMethod: PaymentMethod;
    shipping?: number;
    total?: number;
}

export enum OrderField {
    ORDERAT = "orderAt",
    TOTAL = "total",
}
export interface IOrderQuery {
    search?: string,
    paymentCheck?: string,
    status?: string,
    limit?: number,
    page?: number,
    time?: string,
    sort?: OrderField,
    change?: Change

}
//@Service({ id: "OrderRepository-service"})
export class OrderService extends BaseService<IOrder, OrderRepository> implements IBaseService<IOrder>  {
    constructor() {
        super(new OrderRepository())
    }
    public async getOrders(query: IOrderQuery): Promise<IOrders> {
        const options: any = {
            search: "",
            paymentCheck: "",
            status: "",
            limit: 5,
            page: 1,
            time: "" ,
            sort: OrderField.ORDERAT,
            change: Change.DESC
        }
        if(!!query.search && query.search.trim() !== "") options.search = query.search;
        if(!!query.paymentCheck && query.paymentCheck.trim() !== "") options.paymentCheck = query.paymentCheck === "true";
        if(!!query.status && Object.values(Status).some((v) => v === query.status)) options.status = query.status;
        if(!!query.limit && !isNaN(query.limit)) options.limit = query.limit; 
        if(!!query.page && !isNaN(query.page)) options.page = query.page;
        if(!!query.time && query.time.trim() !== "") options.time = periodCal(query.time);
        if(!!query.sort && Object.values(OrderField).some((v) => v === query.sort)) options.sort = query.sort;
        if(!!query.sort && Object.values(Change).some((v) => v === query.change)) options.change = query.change;

        return this.repository.getOrders(options)
        
    }
    public async getOrderById(id: number): Promise<IOrder> {
        return await this.repository.getOrderById(id);
    }
    public async createOrder(data: IOrderCreateProps): Promise<IOrder> {
        try {
            let order = new Order();
            order.userId = data.userId;
            order.details = [];
            data.details?.forEach(detail => {
                const item = new OrderDetail();
                item.productVariantId = detail.productVariantId;
                item.quantity = detail.quantity;
                item.unitPrice = detail.unitPrice;
                order.details = [...order.details, item];
            })
            const newOrder = await this.repository.create(order);
            return this.repository.getOrderById(newOrder.id)
          
        } catch (error) {
            throw error;
        }
       
    }
    public async updateOrderItems(id: number, data: IOrderUpdateItems ): Promise<IOrder> {
        try {
            const currentOrder: IOrder | any = await super.getOneById(id, ["details"]);
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
             await this.repository.create(currentOrder);
            return this.repository.getOrderById(id);
    
        } catch (error) {
            throw error;
        }
    
    }
    public async updateOrderStatus(id: number, data: IOrderUpdateProps): Promise<IOrder> {
        return await this.repository.update(id, data);       
    }
    public async placeOrder(id: number, data: IPlaceOrder): Promise<IOrder> {
        try {
            const order: IOrder| any = this.repository.update(id, {...data, status: Status.ORDERED, orderAt:  new Date(Date.now()).toISOString()});
            return order
        } catch (error) {
            console.log(error)
            throw error
        }
          
    }
    public async getCurrentOrderByUserId(userId: number): Promise<IOrder|null> {
            const options = {
                select: ["id"],
                where: {
                    userId,
                    status: Status.ORDERING
                }
            }
        const order = await this.repository.findOne(options);
        if(!order) return null
        return await this.repository.getOrderById(order.id);
    
    }
    public async getAllOrdersByUserId(userId: number): Promise<IOrder[]> {
       const options = {
           where: {
               userId
           }
       }
        return await this.repository.find(options)
    }

    public async addItemToOrder(id: number, data: IOrderDetailCreateProps): Promise<IOrder | null> {
            const order: IOrder|null = await this.repository.findOne({ where : { id: id}, relations: ["details"]});

            if(order !== null) 
            {
                if(order.details) {
                    let index: number =  -1;
                 index = order.details.findIndex(x => x.productVariantId === data.productVariantId);
                 if(index !== -1) {
                      order.details[index].quantity += data.quantity;               
                } else {
                    const item = new OrderDetail();
                    item.orderId = id;
                    item.productVariantId = data.productVariantId;
                    item.unitPrice = data.unitPrice;
                    item.quantity = data.quantity;
                    order.details.push(item);

                }
                const temp = await this.repository.create(order);
                }
               
            }
            return await this.repository.getOrderById(id);
            
    }
    
}