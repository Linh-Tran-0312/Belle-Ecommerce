import { Body, Delete, Get, Patch, Path, Post, Query, Route, Security, Tags } from "tsoa";
import { IBlog, Blog, IBlogComment, IBlogCommentCreateProps, UserRole } from "../models";
 
import { BlogCommentService,IBlogCommentService, BlogField, BlogService,IBlogService,IBlogs , Change, IBlogCommentQuery, IBlogQuery } from "../services";
import { ValidateBlogModel } from "../validations";


export interface IBlogCommentUpdateProps {
    text: string;
    blogId: number;
    userId: number;
}

@Route("blogs")
@Tags('Blog')
export class BlogController {
    private _blogService: IBlogService;
    private _blogCommentService: IBlogCommentService;

    constructor() {
        this._blogService = new BlogService();
        this._blogCommentService = new BlogCommentService();
    }

    /**
     * Get all blogs. Search blogs by its category, keyword. Get specific number of blogs by time in descending order
     * @param {number} category
     * @param {number} limit
     * @param {number} page
     * @isInt category Blog category id must be an integer
     * @minimum category 0 Blog category id value must be at least 0
     * @isInt limit Limit must be an integer
     * @minimum limit 1 Limit must be at least 1
     * @isInt page Page must be an integer
     * @minimum page 1 Page must be at least 1
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
    public async createBlog(@Body() data: ValidateBlogModel): Promise<IBlog> {
        return this._blogService.createBlog(data)
    }
    /**
    * Get details for a blog by its id
    * @param {number} id
    * @isInt id Blog id must be an integer
    * @minimum id 0 Blog id must be at least 0
    */
    @Get("/:id")
    public async getBlogById(@Path() id: number): Promise<Blog> {
        return this._blogService.getOneById(id, ["category"]);
    }
    /**
    * Update a blog by its id
    * @param {number} id
    * @isInt id Blog id must be an integer
    * @minimum id 0 Blog id must be at least 0
     */
    @Security("jwt", [UserRole.ADMIN, UserRole.EDITOR])
    @Patch("/:id")
    public async updateBlogById(@Path() id: number, @Body() data: ValidateBlogModel): Promise<IBlog> {
        return this._blogService.updateBlog(id, data);
    }
    /**
    * Delete a blog  by its id
    * @param {number} id
    * @isInt id Blog id must be an integer
    * @minimum id 0 Blog id must be at least 0
    */
    @Security("jwt", [UserRole.ADMIN, UserRole.EDITOR])
    @Delete("/:id")
    public async deleteBlogById(@Path() id: number): Promise<void> {
        return this._blogService.delete(id);
    }

    // Comment Blog Controller

    /**
    * Get blog comments by blogId, default number of comments is 2
    * @param {number} blogId
    * @isInt blogId
    * @minimum blogId 0
    * @param {number} limit
    * @isInt limit
    * @minimum limit 1
    */
    @Get("/:blogId/comments")
    public async getCommentsOfBlog(@Path() blogId: number, @Query() date?: string, @Query() limit?: number): Promise<IBlogComment[]> {

        const query: IBlogCommentQuery = {
            limit: 0,
            date: ""
        }
        if (!!limit && !isNaN(limit)) {
            query.limit = limit
        }
        if (!!date && date.trim() !== "") {
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
     * Update a blog comment by its Id
    * @param {number} commentId
    * @isInt commentId
    * @minimum commentId 0
     */
    @Security("jwt", [UserRole.ADMIN, UserRole.EDITOR, UserRole.CUSTOMER])
    @Patch("/comments/:commentId")
    public async updateCommentById(@Path() commentId: number, @Body() data: IBlogCommentUpdateProps): Promise<IBlogComment> {
        return this._blogCommentService.update(commentId, data)
    }
    /**
     * Delete a blog comment by its Id
    * @param {number} commentId
    * @isInt commentId
    * @minimum commentId 0
     */
    @Security("jwt", [UserRole.ADMIN, UserRole.EDITOR, UserRole.CUSTOMER])
    @Delete("/comments/:commentId")
    public async deleteCommentById(@Path() commentId: number): Promise<void> {
        return this._blogCommentService.delete(commentId)
    }
}