
import {Column, PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn } from "typeorm";
import { ProductVariant, Order } from "./";

export interface IOrderDetailModel {
    id?: number;
    orderId?: number;
    productVariantId?: number;
    quantity?: number;
    unitPrice?: number;
}

@Entity()
export class OrderDetail {

    @PrimaryGeneratedColumn()
    id!: number;

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