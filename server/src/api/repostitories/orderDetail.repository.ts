import { getRepository } from "typeorm";
import { BaseRepository, IBaseRepository } from "./base.repository";
import { OrderDetail } from "../models";
import { Service } from "typedi";

@Service({ id: "orderDetail-repository"})
export class OrderDetailRepository extends BaseRepository<OrderDetail> implements IBaseRepository<OrderDetail> {
    constructor() {
        super(getRepository(OrderDetail));
    }
}