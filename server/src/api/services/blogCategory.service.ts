import { Service } from "typedi";
import { Blog, BlogCategory, IBlogCategory  } from "../models";
import { BlogCategoryRepository } from "../repositories";
import { BaseService, IBaseService } from "./base.service";


@Service({ id: "blogCategory-service"})
export class BlogCategoryService extends BaseService<BlogCategory, BlogCategoryRepository> implements IBaseService<IBlogCategory>  {
    constructor() {
        super(new BlogCategoryRepository())
    }
}