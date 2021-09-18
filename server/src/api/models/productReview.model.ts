import { CreateDateColumn, Column, PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn } from "typeorm";
import { Product, User  } from "./";

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

    @ManyToOne(() => User)
    user!: User;

    @ManyToOne(() => Product, product => product.reviews, { onDelete: "CASCADE"})
    product!: Product;

    @CreateDateColumn()
    createdAt!: Date;

}