import { Service } from "typedi";
import { Blog, BlogCategory, IBlogCategory  } from "../models";
import { IBlogCategoryRepository,BlogCategoryRepository } from "../repositories";
import { BaseService, IBaseService } from "./base.service";

export interface IBlogCategoryService extends IBaseService<BlogCategory> {}

@Service({ id: "blogCategory-service"})
export class BlogCategoryService extends BaseService<BlogCategory, IBlogCategoryRepository> implements IBlogCategoryService   {
    constructor() {
        super(new BlogCategoryRepository())
    }
}