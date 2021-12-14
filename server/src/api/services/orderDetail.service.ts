import { IOrderDetail } from "../models";
import { OrderDetailRepository } from "../repositories";
import { BaseService, IBaseService } from "./base.service";


//@Service({ id: "OrderDetailRepository-service"})
export class OrderDetailService extends BaseService<IOrderDetail, OrderDetailRepository> implements IBaseService<IOrderDetail>  {
    constructor() {
        super(new OrderDetailRepository())
    }
    public async updateItemQuantity(id: number, quantity: number): Promise<IOrderDetail> {
        const item = await this.getOneById(id);
        if(item) {
            item.quantity += quantity;
        }
        return await this.repository.create(item);
    }
}