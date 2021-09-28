
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Color, Product, Size } from "./";
import { BaseEntity, IBaseEntity } from "./base.model";

export interface IProductVariantCreateProps {
    productId: number;
    sizeId: number;
    colorId: number;
    quantity: number;
}
export interface IProductVariant extends IProductVariantCreateProps, IBaseEntity {};

@Entity()
export class ProductVariant extends BaseEntity implements IProductVariantCreateProps{

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