import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { IUser, Product, User } from "./";
import { CustomBaseEntity, IBaseEntity } from "./base.model";

export interface IProductReviewCreateProps {
    title: string;
    text: string;
    productId: number;
    rating: number;
    userId: number;
}

export interface IProductReview extends IProductReviewCreateProps, IBaseEntity {
    user?: IUser;
};

@Entity()
export class ProductReview  extends CustomBaseEntity {

    @Column({nullable: true})
    title!: string;

    @Column({nullable: true, type: "text"})
    text!: string;

    @Column({default: 0})
    rating!: number;

    @Column()
    userId!: number;

    @ManyToOne(() => User)
    @JoinColumn()
    user!: User;

    @Column()
    productId!: number;

    @ManyToOne(() => Product, product => product.reviews, { onDelete: "CASCADE"})
    @JoinColumn()
    product!: Product;
}