import { Body, Delete, Get, Patch, Path, Post, Query, Route, Tags, Security } from "tsoa";
import { IBlogs } from "../repositories";
import { IBlog, IBlogComment, IBlogCommentCreateProps, IBlogCreateProps } from "../models";
import { BlogCommentService, BlogService, IBlogQuery, IBlogCommentQuery, BlogField, Change } from "../services";
import { UserRole } from "../models";
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
     * @param {number} category
     * @param {number} limit
     * @param {number} page
     * @isInt category
     * @minimum category 0
     * @isInt limit
     * @minimum limit 1
     * @isInt page
     * @minimum page 1
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
            category,
            limit: limit || 5,
            page: page || 1,
            sort: sort || BlogField.DATE,
            change: change || Change.DESC,
            search: search?.trim() 
        }   
        return this._blogService.getBlogs(query)
    }
    /**
     * Create a new blog
     */
    @Security("jwt", [UserRole.ADMIN, UserRole.EDITOR])
    @Post("/")
    public async createBlog(@Body() data: IBlogCreateProps): Promise<IBlog> {
        return this._blogService.createBlog(data) 
    }
    /**
     * Get details for a blog by its id
     */
    @Get("/:id")
    public async getBlogById(@Path() id: number): Promise<IBlog> {
        return this._blogService.getOneById(id, ["category"]);
    }
    /**
     * Update a blog partially by its id
     */
    @Security("jwt", [UserRole.ADMIN, UserRole.EDITOR])
    @Patch("/:id")
    public async updateBlogById(@Path() id: number, @Body() data: IBlogUpdateProps): Promise<IBlog> {
        return this._blogService.updateBlog(id, data);
    }
    /**
     * Delete a blog  by its id
     */
    @Security("jwt", [UserRole.ADMIN, UserRole.EDITOR])
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
    @Security("jwt", [UserRole.ADMIN, UserRole.EDITOR, UserRole.CUSTOMER])
    @Post("/comments")
    public async createComment(@Body() data: IBlogCommentCreateProps): Promise<IBlogComment> {
        return this._blogCommentService.create(data)
    }
    /**
     * Update a blog comment by its Id, 
     */
    @Security("jwt", [UserRole.ADMIN, UserRole.EDITOR, UserRole.CUSTOMER])
    @Patch("/comments/:commentId")
    public async updateCommentById(@Path() commentId: number, @Body() data: IBlogCommentUpdateProps): Promise<IBlogComment> {
        return this._blogCommentService.update(commentId, data )
    }
    /**
     * Delete a blog comment by its Id, 
     */
    @Security("jwt", [UserRole.ADMIN, UserRole.EDITOR, UserRole.CUSTOMER])
    @Delete("/comments/:commentId")
    public async deleteCommentById(@Path() commentId: number): Promise<void> {
        return this._blogCommentService.delete(commentId)
    }
}