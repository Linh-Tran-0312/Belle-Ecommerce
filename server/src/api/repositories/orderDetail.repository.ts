 import { getRepository } from "typeorm";
import { BaseRepository, IBaseRepository } from "./base.repository";
import { OrderDetail, IOrderDetail, IOrderDetailCreateProps } from "../models";
import { Service } from "typedi";

@Service({ id: "orderDetail-repository"})
export class OrderDetailRepository extends BaseRepository<IOrderDetail, OrderDetail, IOrderDetailCreateProps> {
    constructor() {
        super(getRepository(OrderDetail));
    }
}  