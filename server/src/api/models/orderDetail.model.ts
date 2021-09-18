
import {Column, PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn } from "typeorm";
import { ProductVariant, Order } from "./";

@Entity()
export class OrderDetail  {

    @PrimaryGeneratedColumn()
    id!: Number;

    @ManyToOne(()=> Order, order => order.details, { onDelete: 'CASCADE'} )
    order!: Order;

    @ManyToOne(()=> ProductVariant)
    productVariant!: ProductVariant;
   
    @Column({default: 0})
    quantity!: number;

    @Column({default: 0})
    unitPrice!: number ;

}