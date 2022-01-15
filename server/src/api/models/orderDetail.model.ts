
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Order, ProductVariant } from "./";
import { CustomBaseEntity } from "./base.model";


@Entity()
export class OrderDetail extends CustomBaseEntity  {

    @Column()
    orderId!: number;

    @ManyToOne(()=> Order, order => order.details, { onDelete: 'CASCADE'} )
    @JoinColumn()
    order!: Order;

    @Column()
    productVariantId!: number;

    @ManyToOne(()=> ProductVariant, { onDelete: "CASCADE"})
    @JoinColumn()
    productVariant!: ProductVariant;
   
    @Column({default: 0})
    quantity!: number;

    @Column({default: 0})
    unitPrice!: number ;

}