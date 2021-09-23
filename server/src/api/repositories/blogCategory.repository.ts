import { getRepository } from "typeorm";
import { BaseRepository } from "./base.repository";
import { BlogCategory, IBlogCategoryCreateProps, IBlogCategory } from "../models";
import { Service } from "typedi";

//@Service({ id: "blogCategory-repository"})
export class BlogCategoryRepository extends BaseRepository<IBlogCategory, BlogCategory, IBlogCategoryCreateProps> {
    constructor() {
        super(getRepository(BlogCategory));
    }
}