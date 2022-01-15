import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Product, User } from "./";
import { CustomBaseEntity } from "./base.model";

 
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