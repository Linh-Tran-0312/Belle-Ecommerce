import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { IUser, Product, User } from "./";
import { CustomBaseEntity, IBaseEntity } from "./base.model";

export interface IProductCommentCreateProps {
    text: string;
    userId: number;
    productId: number;
    parentCommentId?: number;
    user?: IUser;
}

export interface IProductComment extends IProductCommentCreateProps, IBaseEntity {
    childComment?: IProductCommentCreateProps[];
}

@Entity()
export class ProductComment extends CustomBaseEntity implements IProductCommentCreateProps  {

    @Column({type: "text"})
    text!: string;

    @Column()
    userId!: number;

    @ManyToOne(() => User)
    @JoinColumn()
    user!: User;

    @Column()
    productId!: number;

    @ManyToOne(() => Product, product => product.comments, { onDelete: "CASCADE"})
    @JoinColumn()
    product!: Product;

    @Column({nullable: true})
    parentCommentId!: number;

    @ManyToOne(() => ProductComment, productComment => productComment.childComments, { onDelete: "CASCADE", nullable: true})
    @JoinColumn()
    parentComment!: ProductComment;


    @OneToMany(() => ProductComment, productComment => productComment.parentComment)
    childComments!: Array<ProductComment>;

}