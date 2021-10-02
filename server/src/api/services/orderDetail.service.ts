import { IOrderDetail } from "../models";
import { OrderDetailRepository } from "../repositories";
import { BaseService, IBaseService } from "./base.service";


//@Service({ id: "OrderDetailRepository-service"})
export class OrderDetailService extends BaseService<IOrderDetail, OrderDetailRepository> implements IBaseService<IOrderDetail>  {
    constructor() {
        super(new OrderDetailRepository())
    }
}