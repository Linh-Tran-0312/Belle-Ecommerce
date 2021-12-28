
import { Column, Entity, JoinColumn, ManyToOne, EventSubscriber } from "typeorm";
import { Color, Product, Size, ISize, IColor } from "./";
import { CustomBaseEntity, IBaseEntity } from "./base.model";

export interface IProductVariantCreateProps {
    productId: number;
    sizeId: number;
    colorId: number;
    quantity: number;
}
export interface IProductVariant extends IProductVariantCreateProps, IBaseEntity {
    size?: ISize;
    color?: IColor;
};

@Entity()
export class ProductVariant extends CustomBaseEntity implements IProductVariantCreateProps{

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