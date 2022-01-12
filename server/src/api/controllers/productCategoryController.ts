import { Body, Delete, Get, Patch, Path, Post, Route, Tags, Security } from "tsoa";
import { IProductCategory, IProductCategoryCreateProps, UserRole } from "../models";
import { ProductCategoryService, IProductCategoryService } from "../services";
import { ValidateCategoryModel } from "../validations";


@Route("product-categories")
@Tags('Product Category')
export class ProductCategoryController {
    private _productCategoryService: IProductCategoryService;

    constructor() {
        this._productCategoryService = new ProductCategoryService();
    }

    /**
     * Get all product categories
     */
    @Get("/")
    public async getProductCategorys(): Promise<IProductCategory[]> {
        return this._productCategoryService.getAll({});
    }
    /**
     * Create new product Category
     */
     @Security("jwt", [UserRole.ADMIN,UserRole.EDITOR])
    @Post("/")
    public async createProductCategory(@Body() data: ValidateCategoryModel): Promise<IProductCategory> {
        return this._productCategoryService.create(data)
    }
    /**
    * Update product category info
    * @param {number} id
    * @isInt id Product category id must be an integer
    * @minimum id 0 Product category id must be at least 0
    */
     @Security("jwt", [UserRole.ADMIN,UserRole.EDITOR])
    @Patch("/:id")
    public async updateProductCategoryById(@Path() id: number, @Body() data: ValidateCategoryModel): Promise<IProductCategory> {
        return this._productCategoryService.update(id, data);
    }
    /**
     * Delete product category
    * @param {number} id
    * @isInt id Product category id must be an integer
    * @minimum id 0 Product category id must be at least 0
     */
     @Security("jwt", [UserRole.ADMIN,UserRole.EDITOR])
    @Delete("/:id")
    public async deleteProductCategoryById(@Path() id: number): Promise<void> {
        return this._productCategoryService.delete(id);
    }
}