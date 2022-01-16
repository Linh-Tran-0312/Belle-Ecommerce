import { Service, Inject } from "typedi";
import { ILike } from "typeorm";
import { Blog } from "../models";
import { BlogRepository, IBlogRepository } from "../repositories";
import { BaseService, IBaseService } from "./base.service";
import { Change } from "./index";
import { ValidateBlogModel } from "../validations";
export enum BlogField {
    NAME = "title",
    DATE = "createdAt"

}
export interface IBlogQuery {
    category?: number,
    limit?: number,
    page?: number,
    sort?: BlogField,
    change?: Change,
    search?: string
}

export interface IBlogs {
    blogs: Blog[],
    total: number
}

export interface IBlogService extends IBaseService<Blog> {
    getBlogs(query: IBlogQuery): Promise<IBlogs>;
    createBlog(data: ValidateBlogModel ): Promise<Blog>;
    updateBlog(id: number, data: ValidateBlogModel ): Promise<Blog>

};

@Service()
export class BlogService extends BaseService<Blog, IBlogRepository> implements IBlogService {
    constructor(
        blogRepository: BlogRepository
    ) {
        super(blogRepository)
    }

    public async getBlogs(query: IBlogQuery): Promise<IBlogs> {
        let options: any = {
            select: ["id", "title", "createdAt", "category", "imgPath", "content"],
            relations: ["category"],
            where: {},
            order: {}
        }

        if (query.category) options.where.categoryId = query.category;
        if (query.search) options.where.title = ILike(`%${query.search}%`);
        if (query.limit) options.take = query.limit;
        if (query.page) options.skip = options.take * (query.page - 1);
        options.order[`${query.sort}`] = query.change;
        let result: IBlogs = {
            blogs: [],
            total: 0
        }
        const [blogs, count] = await this.repository.findAndCount(options);
        result.blogs = blogs;
        result.total = count;
        return result
    }
    public async createBlog(data: ValidateBlogModel): Promise<Blog> {
        const { id } = await this.repository.create(data);
        const newBlog = await this.getOneById(id, ["category"]);
        return newBlog
    }
    public async updateBlog(id: number, data: ValidateBlogModel): Promise<Blog> {
        await this.repository.update(id, data);
        const updatedBlog = await this.getOneById(id, ["category"]);
        return updatedBlog;
    }
}