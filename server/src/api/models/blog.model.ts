
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BlogCategory, BlogComment } from "./";

@Entity()
export class Blog {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @ManyToOne(() => BlogCategory, blogCategory => blogCategory.blogs, { onDelete: "SET NULL"})
    category!: BlogCategory;

    @Column({nullable: true})
    imgPath!: string;

    @Column({type: "text"})
    content!: string;

    @Column({default: true})
    commentAllow!: boolean;

    @OneToMany(() => BlogComment, blogComment => blogComment.blog)
    comments!: BlogComment[];

    @CreateDateColumn()
    createdAt!: Date;
}