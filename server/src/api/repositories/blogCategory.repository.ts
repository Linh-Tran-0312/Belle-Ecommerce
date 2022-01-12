import { getRepository } from "typeorm";
import { BaseRepository, IBaseRepository } from "./base.repository";
import { BlogCategory, IBlogCategoryCreateProps, IBlogCategory } from "../models";
import { Service } from "typedi";

export interface IBlogCategoryRepository extends IBaseRepository<BlogCategory> {}

//@Service({ id: "blogCategory-repository"})
export class BlogCategoryRepository extends BaseRepository<BlogCategory> implements IBlogCategoryRepository{
    constructor() {
        super(getRepository(BlogCategory));
    }
}