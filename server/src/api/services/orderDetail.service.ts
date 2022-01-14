import { OrderDetail } from "../models";
import { OrderDetailRepository,IOrderDetailRepository } from "../repositories";
import { BaseService, IBaseService } from "./base.service";

export interface IItemDetails {
    id: number,
    orderId: number,
    quantity: number,
    unitPrice: number,
    productVariantId: number,
    product: {
      id: number,
      name: string,
      imgPaths: string[],
      brand: string,
      color: string,
      size: string,
    }
  }
  
export interface IOrderDetailCreateProps {
    orderId?: number;
    productVariantId: number;
    quantity: number;
    unitPrice: number;
}

export interface IOrderDetailService extends IBaseService<OrderDetail> {
    updateItemQuantity(id: number, quantity: number): Promise<OrderDetail>
}

//@Service({ id: "OrderDetailRepository-service"})
export class OrderDetailService extends BaseService<OrderDetail, IOrderDetailRepository> implements IOrderDetailService   {
    constructor() {
        super(new OrderDetailRepository())
    }
    public async updateItemQuantity(id: number, quantity: number): Promise<OrderDetail> {
        const item = await this.getOneById(id);
        if(item) {
            item.quantity += quantity;
        }
        return await this.repository.create(item);
    }
}