import { IOrder } from "../models";
import { OrderRepository } from "../repositories";
import { BaseService, IBaseService } from "./base.service";


//@Service({ id: "OrderRepository-service"})
export class OrderService extends BaseService<IOrder, OrderRepository> implements IBaseService<IOrder>  {
    constructor() {
        super(new OrderRepository())
    }
}