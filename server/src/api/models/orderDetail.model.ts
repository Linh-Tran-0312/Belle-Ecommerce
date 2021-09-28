
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Order, ProductVariant } from "./";
import { BaseEntity, IBaseEntity } from "./base.model";

export interface IOrderDetailCreateProps {
    orderId?: number;
    productVariantId: number;
    quantity: number;
    unitPrice: number;
}

export interface IOrderDetail extends IOrderDetailCreateProps, IBaseEntity {};

@Entity()
export class OrderDetail extends BaseEntity implements IOrderDetailCreateProps {

    @Column()
    orderId!: number;

    @ManyToOne(()=> Order, order => order.details, { onDelete: 'CASCADE'} )
    @JoinColumn()
    order!: Order;

    @Column()
    productVariantId!: number;

    @ManyToOne(()=> ProductVariant)
    @JoinColumn()
    productVariant!: ProductVariant;
   
    @Column({default: 0})
    quantity!: number;

    @Column({default: 0})
    unitPrice!: number ;

}