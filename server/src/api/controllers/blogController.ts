import { Body, Delete, Get, Patch, Path, Post, Query, Route, Tags } from "tsoa";
import { IBlog, IBlogComment, IBlogCreateProps } from "../models";
import { BlogCategoryService, BlogCommentService, BlogService } from "../services";

export interface IBlogUpdateProps {
    title?: string;
    categoryId?: number;
    imgPath?: string;
    content?: string;
    commentAllow?: boolean; 
}

@Route("blogs")
@Tags('Blog')
export class BlogController {
    private _blogService: BlogService;
    private _blogCommentService: BlogCommentService;

    constructor() {
        this._blogService = new BlogService();
        this._blogCommentService = new BlogCommentService();
    }

    /**
     * Get all blogs. Search blogs by its category, keyword. Get specific number of blogs by time in descending order
     */
    @Get("/")
    public async getBlogs(
        @Query() category?: number,
        @Query() limit?: number,
        @Query() date?: string,
        @Query() search?: string
    ): Promise<IBlog[]> {
       
        const query = {
            category: 0,
            limit: 0,
            date: "",
            search: ""
        }   
        if(!!category && !isNaN(category)) {
           query.category = category;
        }
        if(!!limit  && !isNaN(limit)) {
            query.limit = limit;
         }
         if(!!date) {
            query.date = date;
         }
         if(!!search && search.trim() !== "") {
            query.search = search;
         }
        return this._blogService.getBlogs(query)
    }
    /**
     * Create a new blog
     */
    @Post("/")
    public async createBlog(@Body() data: IBlogCreateProps): Promise<IBlog> {
        return this._blogService.create(data) 
    }
    /**
     * Get details for a blog by its id
     */
    @Get("/:id")
    public async getBlogById(@Path() id: number): Promise<IBlog | null> {
        return this._blogService.getOneById(id, ["category"]);
    }
    /**
     * Update a blog partially by its id
     */
    @Patch("/:id")
    public async updateBlogById(@Path() id: number, @Body() data: IBlogUpdateProps): Promise<IBlog> {
        return this._blogService.update(id, data);
    }
    /**
     * Delete a blog  by its id
     */
    @Delete("/:id")
    public async deleteBlogById(@Path() id: number): Promise<void> {
        return this._blogService.delete(id);
    }

    /**
     * Get blog comments by blogId, default number of comments is 2 
     */
    @Get("/:blogId/comments")
    public async getCommentsOfBlog(@Path() blogId: string, @Query() date?: string): Promise<IBlogComment[]> {
        if (!!date) return this._blogCommentService.getCommentsOfBlog(Number(blogId), new Date(date));
        return this._blogCommentService.getCommentsOfBlog(Number(blogId));
    }

}