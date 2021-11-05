import { Body, Delete, Get, Patch, Path, Post, Query, Route, Tags } from "tsoa";
import { IBlogs } from "../repositories";
import { IBlog, IBlogComment, IBlogCommentCreateProps, IBlogCreateProps } from "../models";
import { BlogCommentService, BlogService, IBlogQuery, IBlogCommentQuery, BlogField, Change } from "../services";

export interface IBlogUpdateProps {
    title?: string;
    categoryId?: number;
    imgPath?: string;
    content?: string;
    commentAllow?: boolean; 
}
export interface IBlogCommentUpdateProps {
    text: string;
    blogId: number;
    userId: number;
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
        @Query() sort?: BlogField,
        @Query() page?: number,
        @Query() change?: Change,
        @Query() search?: string
    ): Promise<IBlogs> {
       
        const query: IBlogQuery = {
            category: 0,
            limit: 6,
            page: 0,
            sort: BlogField.DATE,
            change: Change.DESC,
            search: ""
        }   
        if(!!category && !isNaN(category)) {
           query.category = category;
        }
        if(!!limit  && !isNaN(limit)) {
            query.limit = limit;
        }
        if(!!page && !isNaN(page))
        {
            query.page = page
        }
        if(!!sort && sort.trim() !== "")
        {
            query.sort = sort
        }
         if(!!change && change.trim() !== "") {
            query.change = change;
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
    public async createBlog(@Body() data: IBlogCreateProps): Promise<IBlog|null> {
        return this._blogService.createBlog(data) 
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
    public async updateBlogById(@Path() id: number, @Body() data: IBlogUpdateProps): Promise<IBlog|null> {
        return this._blogService.updateBlog(id, data);
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
    public async getCommentsOfBlog(@Path() blogId: number, @Query() date?: string, @Query() limit?: number): Promise<IBlogComment[]> {
       
        const query: IBlogCommentQuery = {
            limit: 0,
            date: ""
        } 
        if(!!limit && !isNaN(limit)) {
            query.limit = limit
        }
        if(!! date && date.trim() !== "") {
            query.date = date
        }
        return this._blogCommentService.getCommentsOfBlog(blogId, query);
    }
    /**
     * Create new blog comment
     */
    @Post("/comments")
    public async createComment(@Body() data: IBlogCommentCreateProps): Promise<IBlogComment> {
        return this._blogCommentService.create(data)
    }
    /**
     * Update a blog comment by its Id, 
     */
    @Patch("/comments/:commentId")
    public async updateCommentById(@Path() commentId: number, @Body() data: IBlogCommentUpdateProps): Promise<IBlogComment> {
        return this._blogCommentService.update(commentId, data )
    }
    /**
     * Delete a blog comment by its Id, 
     */
    @Delete("/comments/:commentId")
    public async deleteCommentById(@Path() commentId: number): Promise<void> {
        return this._blogCommentService.delete(commentId)
    }
}