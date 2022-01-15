 import { getRepository } from "typeorm";
import { OrderDetail } from "../models";
import { BaseRepository, IBaseRepository } from "./base.repository";

export interface IOrderDetailRepository extends IBaseRepository<OrderDetail> {}

/* @Service({ id: "orderDetail-repository"}) */
export class OrderDetailRepository extends BaseRepository<OrderDetail> implements IOrderDetailRepository{
    constructor() {
        super(getRepository(OrderDetail));
    }
}  