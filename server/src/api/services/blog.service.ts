import { Inject, Service } from "typedi";
import { Blog, IBlog } from "../models";
import { BlogRepository, BaseRepository, IBlogs } from "../repositories";
import { BaseService, IBaseService} from "./base.service";
import { Change } from "./index";
import { ILike, LessThan } from "typeorm";
 
export enum BlogField {
    NAME = "title",
    DATE = "createdAt"

}
export interface IBlogQuery  {
    category: number,
    limit: number,
    page: number,
    sort: BlogField,
    change: Change,
    search: string
}
@Service({ id: "blog-service" })
export class BlogService extends BaseService<IBlog, BlogRepository> implements IBaseService<IBlog>  {
    constructor() {
        super(new BlogRepository())
    }

    public async getBlogs(query: IBlogQuery): Promise<IBlogs> {
        let options: any = {
            select:["id","title","createdAt","category"],
            relations:["category"],
            where: {},
            order: {}
        }
        if (query.category > 0 ) options.where.categoryId = query.category;
        if (!!query.search) options.where.title = ILike(`%${query.search}%`);
        if(query.limit > 0) options.take = query.limit;
        if(query.page > 0) options.skip = query.limit*(query.page - 1);
        if(!!query.sort && !!query.change ) {
            options.order[`${query.sort}`] = query.change
        } 
        console.log("Blog service");
        const result: IBlogs = await this.repository.findAndCount(options);
        if(!result) return { blogs: [], total: 0}
        return result
    }
}