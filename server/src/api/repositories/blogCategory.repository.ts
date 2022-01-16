import { getRepository } from "typeorm";
import { BlogCategory } from "../models";
import { BaseRepository, IBaseRepository } from "./base.repository";
import { Service } from "typedi";
export interface IBlogCategoryRepository extends IBaseRepository<BlogCategory> {}

@Service()
export class BlogCategoryRepository extends BaseRepository<BlogCategory> implements IBlogCategoryRepository{
    constructor() {
        super(getRepository(BlogCategory));
    }
}