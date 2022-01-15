import { getRepository } from "typeorm";
import { BlogCategory } from "../models";
import { BaseRepository, IBaseRepository } from "./base.repository";

export interface IBlogCategoryRepository extends IBaseRepository<BlogCategory> {}

//@Service({ id: "blogCategory-repository"})
export class BlogCategoryRepository extends BaseRepository<BlogCategory> implements IBlogCategoryRepository{
    constructor() {
        super(getRepository(BlogCategory));
    }
}