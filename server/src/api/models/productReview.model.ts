import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { IUser, Product, User } from "./";
import { CustomBaseEntity, IBaseEntity } from "./base.model";

export interface IProductReviewCreateProps {
    title?: string;
    text?: string;
    productId: number;
    rating: number;
    userId: string;
    user?: User;
}

export interface IProductReview extends IProductReviewCreateProps, IBaseEntity {};

@Entity()
export class ProductReview  extends CustomBaseEntity implements IProductReviewCreateProps{

    @Column({nullable: true})
    title!: string;

    @Column({nullable: true, type: "text"})
    text!: string;

    @Column({default: 0})
    rating!: number;

    @Column("uuid")
    userId!: string;

    @ManyToOne(() => User)
    @JoinColumn()
    user!: User;

    @Column()
    productId!: number;

    @ManyToOne(() => Product, product => product.reviews, { onDelete: "CASCADE"})
    @JoinColumn()
    product!: Product;
}