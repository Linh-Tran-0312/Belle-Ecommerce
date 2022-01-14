import { MoreThan, Not } from "typeorm";
import { HttpCode } from "../helpers/HttpCode";
import { OperationalError, OperationalErrorMessage } from "../helpers/OperationalError";
import { periodCal } from "../helpers/timeHandler";
import { OrderMapper, UserMapper } from "../mappers";
import { Order, OrderDetail, PaymentMethod, Status } from "../models";
import { OrderRepository, IOrderRepository } from "../repositories";
import { BaseService, IBaseService } from "./base.service";
import { Change, IUserName, IUserAuth, IOrderDetailCreateProps, IItemDetails } from "./index";


export enum OrderField {
    ORDERAT = "orderAt",
    TOTAL = "total",
}
export interface IOrderQuery {
    search?: string,
    paymentCheck?: boolean,
    status?: string,
    limit?: number,
    page?: number,
    time?: string,
    sort?: OrderField,
    change?: Change

}

export interface IPlaceOrder {
    address: string;
    note?: string;
    paymentMethod: PaymentMethod;
    shipping?: number;
    total?: number;
}
export interface IOrderCreateProps {
    userId: number;
    details?: IOrderDetailCreateProps[];
}
export interface IOrderUpdateProps {
    status?: Status;
    paymentCheck?: boolean;
    paymentMethod?: PaymentMethod;
    address?: string,
}


export interface IOrderBasicProps {
    id: number,
    status: Status,
    paymentMethod: PaymentMethod,
    paymentCheck: boolean,
    address: string,
    total: number,
    shipping?: number,
    note?: string,
    orderAt: Date,
}
export interface IOrderInfo extends IOrderBasicProps {
    user: IUserAuth;
    details: IItemDetails[];
}
export interface IOrderSearchProps extends IOrderBasicProps {
    user: IUserName
}
export interface IOrders {
    orders: IOrderSearchProps[],
    total: number
}

export interface IOrderService extends IBaseService<Order> {
    getOrders(query: IOrderQuery): Promise<IOrders>;
    getOrderById(id: number): Promise<IOrderInfo>;
    createOrder(data: IOrderCreateProps): Promise<IOrderInfo>;
    updateOrderItems(id: number, details: IOrderDetailCreateProps[]): Promise<IOrderInfo>;
    updateOrderStatus(id: number, data: IOrderUpdateProps): Promise<IOrderInfo>;
    placeOrder(id: number, data: IPlaceOrder): Promise<IOrderInfo>;
    getCurrentOrderByUserId(userId: number): Promise<IOrderInfo | null>;
    getAllOrdersByUserId(userId: number): Promise<IOrderBasicProps[]>;
    addItemToOrder(id: number, data: IOrderDetailCreateProps): Promise<IOrderInfo>
};

//@Service({ id: "OrderRepository-service"})
export class OrderService extends BaseService<Order, IOrderRepository> implements IOrderService {
    constructor() {
        super(new OrderRepository())
    }
    public async getOrders(query: IOrderQuery): Promise<IOrders> {
        /*    const options: any = {
               search: "",
               paymentCheck: "",
               status: "",
               limit: 5,
               page: 1,
               time: "" ,
               sort: OrderField.ORDERAT,
               change: Change.DESC
           }
           if(!!query.search) options.search = query.search;
           if(query.paymentCheck !== undefined ) options.paymentCheck = query.paymentCheck;
           if(query.status !== undefined) options.status = query.status;
           options.limit = query.limit; 
           options.page = query.page;
           if(!!query.time && query.time.trim() !== "") options.time = periodCal(query.time);
            options.sort = query.sort;
            options.change = query.change; */
        const options: any = {
            relations: ["user"],
            where: {},
            order: {}
        }
        const whereCondition: any = {
            status: Not(Status.ORDERING)
        };
        if (query.paymentCheck !== undefined) whereCondition.paymentCheck = query.paymentCheck;
        if (query.status !== undefined) whereCondition.status = query.status;
        if (!!query.time) {
            const time = periodCal(query.time);
            whereCondition.orderAt = MoreThan(time.start);
        }
        options.sort = query.sort;
        options.change = query.change;
        options.take = query.limit;
        options.skip = options.take * (query.page! - 1);
        if (query.search) {
            options.where = [
                {
                    address: `%${options.search}%`, ...whereCondition
                }, {
                    user: {
                        fname: `%${options.search}%`
                    },
                    ...whereCondition
                }, {
                    user: {
                        lname: `%${options.search}%`
                    },
                    ...whereCondition
                }, {
                    user: {
                        phone: `%${options.search}%`
                    },
                    ...whereCondition
                }
            ]
        } else {
            options.where = { ...whereCondition }
        }

        const [orders, total] = await this.repository.findAndCount(options);
        const ordersResponse: IOrderSearchProps[] = orders.map((o: Order) => {
            const order: IOrderSearchProps = { ...OrderMapper.toBasicProps(o), user: UserMapper.toUserName(o.user) };
            return order
        })
        return { orders: ordersResponse, total }

    }
    public async getOrderById(id: number): Promise<IOrderInfo> {

        const options: any = {
            relations: ["user",
                "details",
                "details.productVariant",
                "details.productVariant.product",
                "details.productVariant.product.brand",
                "details.productVariant.product.size",
                "details.productVariant.product.color"
            ],
            where: {
                id
            }
        }
        const order = await this.repository.findOne(options);
        if (!order) throw new OperationalError(OperationalErrorMessage.NOT_FOUND, HttpCode.NOT_FOUND);

        return OrderMapper.toOrderInfo(order);
    }
    public async createOrder(data: IOrderCreateProps): Promise<IOrderInfo> {
        try {
            let order = new Order();
            order.userId = data.userId;
            order.details = [];
            data.details?.forEach(detail => {
                const item = new OrderDetail();
                item.productVariantId = detail.productVariantId;
                item.quantity = detail.quantity;
                item.unitPrice = detail.unitPrice;
                order.details = [...order.details, item];
            })
            const newOrder = await this.repository.create(order);
            return this.repository.getOrderById(newOrder.id)

        } catch (error) {
            throw error;
        }

    }
    public async updateOrderItems(id: number, details: IOrderDetailCreateProps[]): Promise<IOrderInfo> {
        try {
            let currentOrder: Order | null = await this.repository.findOne({
                relations: ["details"],
                where: {
                    userId: id,
                    status: Status.ORDERING
                }
            });
            if (!currentOrder) {
                currentOrder = new Order();
                currentOrder.userId = id;
                currentOrder.details = [];
                details.forEach(detail => {
                    const item = new OrderDetail();
                    item.productVariantId = detail.productVariantId;
                    item.unitPrice = detail.unitPrice;
                    item.quantity = detail.quantity;
                    currentOrder?.details.push(item);
                })
            } else {
                details.forEach(detail => {
                    const index = currentOrder?.details?.findIndex((item: { productVariantId: number; }) => item.productVariantId === detail.productVariantId) ?? -1;
                    if (index === -1) {
                        const newItem = new OrderDetail();
                        newItem.productVariantId = detail.productVariantId;
                        newItem.quantity = detail.quantity;
                        newItem.unitPrice = detail.unitPrice;
                        currentOrder?.details.push(newItem);
                    } else {
                        currentOrder!.details[index].quantity += detail.quantity
                    }

                })
            }

            await this.repository.create(currentOrder);
            return this.repository.getOrderById(id);

        } catch (error) {
            throw error;
        }

    }
    public async updateOrderStatus(id: number, data: IOrderUpdateProps): Promise<IOrderInfo> {
        return await this.repository.update(id, { ...data, id: id });
    }
    public async placeOrder(id: number, data: IPlaceOrder): Promise<IOrderInfo> {
        return await this.repository.update(id, { ...data, status: Status.ORDERED, orderAt: new Date(Date.now()).toISOString() });
    }
    public async getCurrentOrderByUserId(userId: number): Promise<IOrderInfo | null> {
        const options = {
            select: ["id"],
            where: {
                userId,
                status: Status.ORDERING
            }
        }
        const order = await this.repository.findOne(options);
        if (!order) return null
        return await this.repository.getOrderById(order.id);

    }
    public async getAllOrdersByUserId(userId: number): Promise<IOrderBasicProps[]> {
        const options: any = {
            where: {
                userId
            },
            order: { orderAt: "DESC" }
        }
        return await this.repository.find(options)
    }
    public async addItemToOrder(id: number, data: IOrderDetailCreateProps): Promise<IOrderInfo> {
        const order = await this.repository.findOne({ where: { id: id }, relations: ["details"] });

        if (order !== null) {
            if (order.details) {
                let index: number = -1;
                index = order.details.findIndex(x => x.productVariantId === data.productVariantId);
                if (index !== -1) {
                    order.details[index].quantity += data.quantity;
                } else {
                    const item = new OrderDetail();
                    item.orderId = id;
                    item.productVariantId = data.productVariantId;
                    item.unitPrice = data.unitPrice;
                    item.quantity = data.quantity;
                    order.details.push(item);

                }
                const temp = await this.repository.create(order);
            }

        }
        if (order === null) throw new OperationalError(OperationalErrorMessage.NOT_FOUND, HttpCode.NOT_FOUND)
        return await this.repository.getOrderById(id);
    }
}