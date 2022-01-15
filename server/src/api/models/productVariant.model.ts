
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Color, Product, Size } from "./";
import { CustomBaseEntity } from "./base.model";

 
@Entity()
export class ProductVariant extends CustomBaseEntity {

    @Column()
    productId!: number;

    @ManyToOne(() => Product, product => product.variants, { onDelete: "CASCADE"})
    @JoinColumn()
    product!: Product;

    @Column()
    sizeId!: number;

    @ManyToOne(() => Size)
    @JoinColumn()
    size!: Size;

    @Column()
    colorId!: number;
     
    @ManyToOne(() => Color)
    @JoinColumn()
    color!: Color;
    
    @Column({ default: 0})
    quantity!: number;
}