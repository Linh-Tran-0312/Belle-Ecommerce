 import { getRepository } from "typeorm";
import { OrderDetail } from "../models";
import { BaseRepository, IBaseRepository } from "./base.repository";
import { Service } from "typedi";

export interface IOrderDetailRepository extends IBaseRepository<OrderDetail> {}

@Service()
export class OrderDetailRepository extends BaseRepository<OrderDetail> implements IOrderDetailRepository{
    constructor() {
        super(getRepository(OrderDetail));
    }
}  