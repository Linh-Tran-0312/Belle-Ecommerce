import { Route,Get, Post, Patch, Delete, Tags, Path , Query} from "tsoa";
import { IBaseService, BlogCategoryService, BlogCommentService, BlogService } from "../services"
import { Blog, BlogComment, BlogCategory } from "../models";
import { Service, Inject } from "typedi";

export interface IBlogService {
    getBlogs(): Promise<Blog[]>;
    getBlogById(id: number): Promise<Blog>;
    getBlogsByCategory(categoryId: number): Promise<Blog[]>;
    getMoreComments(blogId: number, date: Date): Promise<BlogComment[]>;

}



@Route("blogs")
@Tags('Blog Controller')
export class BlogController {
    private _blogService: BlogService;
    private _blogCommentService: BlogCommentService;
    private _blogCategoryService: BlogCategoryService;

    constructor(
        @Inject("blog-Service")
        blogService: BlogService,
        @Inject("blogComment-Service")
        blogCommentService: BlogCommentService,
        @Inject("blogCategory-Service")
        blogCategoryService: BlogCategoryService
    ) {
        this._blogService =  blogService;
        this._blogCommentService = blogCommentService;
        this._blogCategoryService = blogCategoryService;
    }

    @Get("/")
    public async getAllBlogs(): Promise<Blog[]> {
        return this._blogService.getAll()
    }

    @Get("/current-blogs")
    public async getCurrentBlogs(): Promise<Blog[]> {
        return this._blogService.getCurrentBlogs();
    }

    @Get("/:id")
    public async getBlogById(@Path() id: string): Promise<Blog | null> {
        return  this._blogService.getOneById(Number(id), ["category"]);   
    }

    @Get("/categories")
    public async getBlogCategory(): Promise<BlogCategory[]> {
        return this._blogCategoryService.getAll();
    }

    @Get("/:blogId/comments")
    public async getMoreCommentsOfBlog(@Path() blogId: string, @Query() date?: string): Promise<BlogComment[]> {
        if(date) return this._blogCommentService.getCommentsOfBlog(Number(blogId), new Date(date));
        return this._blogCommentService.getCommentsOfBlog(Number(blogId));
    }

    @Get("/:categoryId/blogs")
    public async getBlogsByCategory(@Path() categoryId: string): Promise<Blog[]> {
        const category: any = this._blogCategoryService.getOneById(Number(categoryId));
        if(!categoryId) return [];
        return category.blogs;
    }

    @Post("/search")
    public async searchBlogs(@Query() categoryId?: string, @Query() keyword?: string): Promise<Blog[]> {
        return this._blogService.searchBlogs(Number(categoryId), keyword);
    }
}