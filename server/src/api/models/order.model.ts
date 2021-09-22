import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User, OrderDetail } from "./";
import { IOrderDetailModel } from "./orderDetail.model";

enum Status {
    ORDERING = "ordering",
    ORDERED = "ordered",
    DELIVERY = "delivery",
    CANCELLED = "canceled",
    COMPLETED = "completed"
}
enum PaymentMethod {
    COD = "cod",
    BANKTRANS = "banktransfer",
    EWALLET = "e-wallet"
}

export interface IOrderModel {
    id?: number;
    userId?: string;
    categoryId?: number;
    status?: Status;
    paymentMethod?: PaymentMethod;
    paymentCheck?: boolean;
    note?: string;
    address?: string;
    shipping?: number;
    total?: number;
    orderAt?: Date;  
}

@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column("uuid")
    userId!: string;

    @ManyToOne(()=> User, user => user.orders)
    @JoinColumn()
    user!: string;

    @Column({type: "enum",
    enum: Status,
    default: Status.ORDERING})
    status!: Status;

    @Column({type: "enum",
    enum: PaymentMethod,
    default: PaymentMethod.COD})
    paymentMethod!: PaymentMethod;

    @Column({ default: false})
    paymentCheck!: boolean;

    @Column({nullable: true})
    note!: string;

    @Column({nullable: true})
    address!: string;

    @Column({default: 0})
    shipping!: number;

    @Column({default: 0})
    total!: number;
  
    @Column({type: "timestamptz",nullable: true})
    orderAt!: Date;

    @OneToMany(() => OrderDetail, orderDetail => orderDetail.order)
    details!: Array<OrderDetail>;

}