import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Blog } from ".";

@Entity()
export class BlogCategory {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @OneToMany(() => Blog, blog => blog.category)
    blogs!: Array<Blog>;
}