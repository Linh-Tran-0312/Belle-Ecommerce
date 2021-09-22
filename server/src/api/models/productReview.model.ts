import { CreateDateColumn, Column, PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn } from "typeorm";
import { Product, User  } from "./";

export interface IProductReviewModel {
    id?: number;
    title?: string;
    text?: string;
    productId?: number;
    rating?: number;
    userId?: string;
}

@Entity()
export class ProductReview  {

    @PrimaryGeneratedColumn()
    id!: Number;

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

    @CreateDateColumn({ type: "timestamptz"})
    createdAt!: Date;

}