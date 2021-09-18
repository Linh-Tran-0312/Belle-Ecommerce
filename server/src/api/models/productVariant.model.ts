import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Product, Size, Color } from "./";

@Entity()
export class ProductVariant {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Product, product => product.variantList, { onDelete: "CASCADE"} )
    product!: Product;

    @ManyToOne(() => Size)
    size!: Size;

    @ManyToOne(() => Color)
    color!: Color;
    
    @Column({ default: 0})
    quantity!: number;
}