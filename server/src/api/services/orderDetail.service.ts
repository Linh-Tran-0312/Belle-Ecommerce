import { OrderDetail } from "../models";
import { OrderDetailRepository,IOrderDetailRepository } from "../repositories";
import { BaseService, IBaseService } from "./base.service";
import { Service } from "typedi";

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
  
export interface IOrderDetailService extends IBaseService<OrderDetail> {}
     

@Service()
export class OrderDetailService extends BaseService<OrderDetail, IOrderDetailRepository> implements IOrderDetailService   {
    constructor(
        detailRepository: OrderDetailRepository
    ) {
        super(detailRepository)
    }

}