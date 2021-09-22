import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Blog } from ".";

export interface IBlogCategoryModel {
    id?: number;
    name?: string;
}

@Entity()
export class BlogCategory {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @OneToMany(() => Blog, blog => blog.category)
    blogs!: Array<Blog>;
}