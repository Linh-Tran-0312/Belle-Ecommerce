import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { CustomBaseEntity } from "./base.model";
import { OrderDetail } from "./orderDetail.model";
import { User } from "./user.model";

export enum Status {
    ORDERING = "ordering",
    ORDERED = "ordered",
    DELIVERY = "delivery",
    CANCELLED = "canceled",
    COMPLETED = "completed"
}
export enum PaymentMethod {
    COD = "cod",
    BANKTRANS = "banktransfer",
    EWALLET = "e-wallet",
    GATEWAY = "gateway"
}



@Entity()
export class Order  extends CustomBaseEntity {

    @Column()
    userId!: number;

    @ManyToOne(()=> User, user => user.orders)
    @JoinColumn()
    user!: User;

    @Column({type: "enum",
    enum: Status,
    default: Status.ORDERING})
    status!: Status ;

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
  
    @Column({type: "timestamptz", nullable: true, default: () => "now()"})
    orderAt!: Date;

    @OneToMany(() => OrderDetail, orderDetail => orderDetail.order, { cascade: true})
    details!: Array<OrderDetail>;

}