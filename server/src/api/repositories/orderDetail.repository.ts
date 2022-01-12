 import { getRepository } from "typeorm";
import { BaseRepository, IBaseRepository } from "./base.repository";
import { OrderDetail, IOrderDetail, IOrderDetailCreateProps } from "../models";
import { Service } from "typedi";

export interface IOrderDetailRepository extends IBaseRepository<OrderDetail> {}

/* @Service({ id: "orderDetail-repository"}) */
export class OrderDetailRepository extends BaseRepository<OrderDetail> implements IOrderDetailRepository{
    constructor() {
        super(getRepository(OrderDetail));
    }
}  