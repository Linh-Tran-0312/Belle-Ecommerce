import { getRepository } from "typeorm";
import { BaseRepository, IBaseRepository } from "./base.repository";
import { Order, IOrder, IOrderCreateProps } from "../models";
import { Service } from "typedi";

@Service({ id: "order-repository"})
export class OrderRepository extends BaseRepository<IOrder, Order, IOrderCreateProps> {
    constructor() {
        super(getRepository(Order));
    }
}  