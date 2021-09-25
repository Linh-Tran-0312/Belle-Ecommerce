
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity, IBaseEntity } from "./base.model";
import { BlogCategory, IBlogCategory } from "./blogCategory.model";

export interface IBlogCreateProps {
    title: string;
    categoryId: number;
    imgPath?: string;
    content: string;
    commentAllow?: boolean;   
};

export interface IBlog extends IBlogCreateProps, IBaseEntity {
    category?: IBlogCategory;
};

@Entity()
export class Blog extends BaseEntity implements IBlogCreateProps {

    @Column()
    title!: string;

    @Column({nullable: true})
    categoryId!: number;

    @ManyToOne(() => BlogCategory, { onDelete: "SET NULL"})
    @JoinColumn()
    category!: BlogCategory;

    @Column({nullable: true})
    imgPath!: string;

    @Column({type: "text"})
    content!: string;

    @Column({default: true})
    commentAllow!: boolean;

}