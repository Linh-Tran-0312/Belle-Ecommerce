
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Product, Size, Color } from "./";

export interface IProductVariantModel {
    id?: number;
    productId?: number;
    sizeId?: number;
    colorId?: number;
    quantity?: number;
}

@Entity()
export class ProductVariant {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    productId!: number;

    @ManyToOne(() => Product, product => product.variantList, { onDelete: "CASCADE"})
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