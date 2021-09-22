
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { BlogCategory, BlogComment } from "./";

export interface IBlogModel {
    id?: number;
    title?: string;
    categoryId?: number;
    imgPath?: string;
    content?: string;
    commentAllow?: boolean;   
}

@Entity()
export class Blog {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column({nullable: true})
    categoryId!: number;

    @ManyToOne(() => BlogCategory, blogCategory => blogCategory.blogs, { onDelete: "SET NULL"})
    @JoinColumn()
    category!: BlogCategory;

    @Column({nullable: true})
    imgPath!: string;

    @Column({type: "text"})
    content!: string;

    @Column({default: true})
    commentAllow!: boolean;

    @OneToMany(() => BlogComment, blogComment => blogComment.blog)
    comments!: BlogComment[];

    @CreateDateColumn({ type: "timestamptz"})
    createdAt!: Date;
}