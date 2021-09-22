import { getRepository } from "typeorm";
import { BaseRepository, IBaseRepository } from "./base.repository";
import { Order } from "../models";
import { Service } from "typedi";

@Service({ id: "order-repository"})
export class OrderRepository extends BaseRepository<Order> implements IBaseRepository<Order> {
    constructor() {
        super(getRepository(Order));
    }
}