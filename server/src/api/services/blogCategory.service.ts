import { Service } from "typedi";
import { BlogCategory } from "../models";
import { BlogCategoryRepository, IBlogCategoryRepository } from "../repositories";
import { BaseService, IBaseService } from "./base.service";

export interface IBlogCategoryService extends IBaseService<BlogCategory> {}

@Service()
export class BlogCategoryService extends BaseService<BlogCategory, IBlogCategoryRepository> implements IBlogCategoryService   {
    constructor(
        blogCategoryRepository: BlogCategoryRepository
    ) {
        super(blogCategoryRepository)
    }
}