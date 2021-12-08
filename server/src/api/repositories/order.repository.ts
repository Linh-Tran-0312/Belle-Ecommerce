import { getRepository, Not, Equal, Brackets } from "typeorm";
import { BaseRepository, IBaseRepository } from "./base.repository";
import { Order, IOrder, IOrderCreateProps, Status } from "../models";
import { Service } from "typedi";

export interface IOrders {
    orders: Order[],
    total: number
}
/* 
@Service({ id: "order-repository"}) */
export class OrderRepository extends BaseRepository<IOrder, Order, IOrderCreateProps> {
    constructor() {
        super(getRepository(Order));
    }
    public async findAndCount(options: any): Promise<IOrders> {
        try {
            let result: IOrders = {
                orders: [],
                total: 0
            }
            const [orders, count] = await this.entity.findAndCount(options);
            result.orders = orders;
            result.total = count;
            return result;
        } catch (error) {
            console.log(error);
            throw error
        }
    }
    public async getOrders(options: any): Promise<IOrders> {
        try {
            const orderQuery = this.entity.createQueryBuilder("order")
                .leftJoinAndSelect("order.user", "user")
                .where("order.status != :status", { status: Status.ORDERING })
            if (options.paymentCheck !== "") {
                orderQuery.andWhere("order.paymentCheck = :check", { check: options.paymentCheck })
            }
            if (options.status !== "") {
                orderQuery.andWhere("order.status = :stt", { stt: options.status })
            }
            if (options.search !== "") {
                orderQuery.andWhere(new Brackets(qb => {
                    qb.orWhere("user.fname ILike :fname", { fname: `%${options.search}%` })
                        .orWhere("user.lname ILike :lname", { lname: (`%${options.search}%`) })
                        .orWhere("user.phone ILike :phone", { phone: (`%${options.search}%`) })
                        .orWhere("order.address ILike :address", { address: (`%${options.search}%`) })
                }))
            };
            if (options.time !== "") {
                orderQuery.andWhere("order.orderAt >= :startAt", { startAt: options.time.start.toUTCString() })
               // orderQuery.andWhere("order.orderAt <= :endAt", { endAt: options.time.end.toISOString() })  
               // orderQuery.andWhere("order.orderAt BETWEEN :begin AND :end", { begin: options.time.start.toISOString(), end: options.time.end.toISOString() }) 
            }
            orderQuery.select(["order.id", "order.address", "order.orderAt", "order.total", "order.status", "order.paymentCheck", "order.paymentMethod", "user.fname", "user.lname"])
                .offset(options.limit * (options.page - 1))
                .limit(options.limit)
                .orderBy(`order.${options.sort}`, options.change)
 
            const total = await orderQuery.getCount();
            const orders = await orderQuery.getMany();
            return { orders, total}
        } catch (error) {
            console.log(error);
            throw error
        }

    }
    public async getOrderById(id: number): Promise<IOrder|null> {
        try {
            
            const result: any = await this.entity.createQueryBuilder("order")
                                            .leftJoinAndSelect("order.user","user")
                                            .leftJoinAndSelect("order.details","orderDetail",)
                                            .leftJoinAndSelect("orderDetail.productVariant","productVariant")
                                            .leftJoinAndSelect("productVariant.product","product")
                                            .leftJoinAndSelect("product.brand","brand")
                                            .leftJoinAndSelect("productVariant.size","size")
                                            .leftJoinAndSelect("productVariant.color","color")
                                            .where("order.id = :id", {id})
                                            .select(["order.id","order.status","order.paymentMethod",
                                                    "order.paymentCheck","order.note","order.address",
                                                    "order.shipping","order.total","order.orderAt",
                                                    "user.fname","user.lname","user.email","user.phone","productVariant.id",
                                                    "orderDetail.quantity","orderDetail.unitPrice","orderDetail.id","orderDetail.orderId",
                                                    "product.name","product.imgPaths","brand.name", "size.name","color.name"
                                                   
                                            ])
                                            .getOne();
                                            
            if(!result) return null;
            return result;

        } catch (error) {
            console.log(error);
            throw error
        }
    }
}  