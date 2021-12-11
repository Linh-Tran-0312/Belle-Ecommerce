import { Body, Delete, Get, Patch, Path, Post, Route, Tags, Security } from "tsoa";
import { IBlogCategory, IBlogCategoryCreateProps } from "../models";
import { BlogCategoryService } from "../services";
import { UserRole } from "../models";
export interface IBlogCategoryUpdateProps {
    name?: string;
}

@Route("blog-categories")
@Tags('Blog Category')
export class BlogCategoryController {
    private _blogCategoryService: BlogCategoryService;

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
     * Create new blog category
     */
    @Security("jwt", [UserRole.ADMIN, UserRole.EDITOR])
    @Post("/")
    public async createBlogCategory(@Body() data: IBlogCategoryCreateProps): Promise<IBlogCategory> {
        return this._blogCategoryService.create(data)
    }
    /**
    * Update a blog category partially by its id
    */
    @Security("jwt", [UserRole.ADMIN, UserRole.EDITOR])
    @Patch("/:id")
    public async updateBlogCategoryById(@Path() id: number, @Body() data: IBlogCategoryCreateProps): Promise<IBlogCategory> {
        return this._blogCategoryService.update(id, data);
    }
    /**
     * Delete a blog category by its id
     */
    @Security("jwt", [UserRole.ADMIN, UserRole.EDITOR])
    @Delete("/:id")
    public async deleteBlogCategoryById(@Path() id: number): Promise<void> {
        return this._blogCategoryService.delete(id);
    }
}