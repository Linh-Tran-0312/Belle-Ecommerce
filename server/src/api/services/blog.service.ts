import { IBaseRepository, BlogCategoryRepository, BlogCommentRepository, BlogRepository } from "../repostitories"
import { Blog, BlogComment, BlogCategory } from "../models";
import { Service, Inject } from "typedi";

@Service({ id: "blog-service"})
export class BlogService {
    private _blogRepo: IBaseRepository<Blog>;
    private _blogCommentRepo: IBaseRepository<BlogComment>;
    private _blogCategoryRepo: IBaseRepository<BlogCategory>;

    constructor(
        @Inject("blog-repository")
        blogRepo: BlogRepository,
        @Inject("blogComment-repository")
        blogCommentRepo: BlogCommentRepository,
        @Inject("blogCategory-repository")
        blogCategoryRepo: BlogCategoryRepository
    ) {
        this._blogRepo =  blogRepo;
        this._blogCommentRepo = blogCommentRepo;
        this._blogCategoryRepo = blogCategoryRepo;
    }

    public async getBlogs(): Promise<Blog[]> {
        return this._blogRepo.findWithRelations([])
    }

}