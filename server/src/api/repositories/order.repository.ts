import { Service } from "typedi";
import { getRepository } from "typeorm";
import { PostgresError } from "../helpers/PostgresError";
import { Order, Status } from "../models";
import { BaseRepository, IBaseRepository } from "./base.repository";

export interface IOrderRepository extends IBaseRepository<Order> {
    getTotalSalesAndOrdersByTime(trunc: string, time: any): Promise<any>;
    getOrderProportionByTime(time: any): Promise<any>;
    getTopProductByTime(time: any, query: any): Promise<any>
}

@Service()
export class OrderRepository extends BaseRepository<Order> implements IOrderRepository {
    constructor() {
        super(getRepository(Order));
    }

    public async getTotalSalesAndOrdersByTime(trunc: string, time: any): Promise<any> { 
        try {
            const report = await this.entity.createQueryBuilder("order")
                                            .select(`DATE_TRUNC('${trunc}', order.orderAt)`,"date")
                                            .where("order.orderAt >= :startAt",{startAt: time.start})
                                            .andWhere("order.orderAt < :endAt",{endAt: time.end})
                                            .andWhere("order.status IN (:...status)", {status: [Status.COMPLETED,Status.ORDERED,Status.DELIVERY]})
                                            .addSelect("SUM(order.total)","sales")
                                            .addSelect("COUNT(order.id)","orders")
                                            .groupBy("date")
                                            .orderBy("date")
                                            .getRawMany()
                return report;
        } catch (error: any) {
            throw new  PostgresError(error.message, error)
        }
    }
    public async getOrderProportionByTime(time: any): Promise<any> {
        try {
            const orders = await this.entity.createQueryBuilder("order")
                                            .select(["order.status as status","order.orderAt as date"])
                                            .where("order.orderAt >= :startAt",{startAt: time.start})
                                            .andWhere("order.orderAt < :endAt",{endAt: time.end})
                                            .andWhere("order.status IN (:...status)",{status: [Status.COMPLETED,Status.CANCELLED]})
                                            .getRawMany()
                return orders;
        } catch (error: any) {
            throw new  PostgresError(error.message, error)
        }
    }
    public async getTopProductByTime(time: any, query: any): Promise<any> {
        try {
            const productsQuery = this.entity.createQueryBuilder("order")      
                                            .where("order.orderAt >= :startAt",{startAt: time.start})
                                            .andWhere("order.orderAt < :endAt",{endAt: time.end})
                                            .andWhere("order.status = :status",{status: Status.COMPLETED})                                                                     
                                            .leftJoinAndSelect("order.details","orderDetail")
                                            .leftJoinAndSelect("orderDetail.productVariant","variant")
                                            .leftJoinAndSelect("variant.product","product")
                                            .leftJoinAndSelect("product.brand","brand")                                    
                                            .select("SUM(orderDetail.quantity)","quantity")
                                            .addSelect("SUM(orderDetail.unitPrice * orderDetail.quantity)","sales")
                                            .addSelect(["product.name as name","brand.name as brand"])
                                            .groupBy("product.id")
                                            .addGroupBy("brand.id")
                                            .orderBy("sales","DESC")
                                            .offset(query.limit * (query.page - 1))
                                            .limit(query.limit)
                                           
                const total = await productsQuery.getCount();
                const products = await productsQuery.getRawMany();
                return { total, products};
        } catch (error: any) {
            throw new  PostgresError(error.message, error)
        }
    }
}  