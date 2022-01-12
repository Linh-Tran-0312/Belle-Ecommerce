import { Body, Delete, Get, Patch, Path, Post, Route, Security, Tags } from "tsoa";
import { IBlogCategory, UserRole } from "../models";
import { BlogCategoryService, IBlogCategoryService } from "../services";
import { ValidateBlogCateModel } from "../validations";

@Route("blog-categories")
@Tags('Blog Category')
export class BlogCategoryController {
    private _blogCategoryService: IBlogCategoryService;

    constructor() {
        this._blogCategoryService = new BlogCategoryService();
    }

    /**
     * Get all blog categories 
     */
    @Get("/")
    public async getBlogCategory(): Promise<IBlogCategory[]> {
        return this._blogCategoryService.getAll({});
    }
    /**
     * Create a new blog category
     */
    @Security("jwt", [UserRole.ADMIN, UserRole.EDITOR])
    @Post("/")
    public async createBlogCategory(@Body() data: ValidateBlogCateModel): Promise<IBlogCategory> {
        return this._blogCategoryService.create(data)
    }
    /**
    * Update a blog category by its id
    * @param {number} id 
    * @isInt id Blog category id must be an integer
    * @minimum id 0 Blog category id value must be at least 0
    */
    @Security("jwt", [UserRole.ADMIN, UserRole.EDITOR])
    @Patch("/:id")
    public async updateBlogCategoryById(@Path() id: number, @Body() data: ValidateBlogCateModel): Promise<IBlogCategory> {
        return this._blogCategoryService.update(id, data);
    }
    /**
    * Delete a blog category by its id
    * @param {number} id
    * @isInt id Blog category id must be an integer
    * @minimum id 0 Blog category id value must be at least 0
    */
    @Security("jwt", [UserRole.ADMIN, UserRole.EDITOR])
    @Delete("/:id")
    public async deleteBlogCategoryById(@Path() id: number): Promise<void> {
        return this._blogCategoryService.delete(id);
    }
}