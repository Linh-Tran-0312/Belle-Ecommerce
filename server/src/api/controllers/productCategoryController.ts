import { Body, Delete, Get, Patch, Path, Post, Route, Security, Tags } from "tsoa";
import { ProductCategory, UserRole } from "../models";
import { IProductCategoryService, ProductCategoryService } from "../services";
import { ValidateCategoryModel } from "../validations";
import { Service } from "typedi";

@Service()
@Route("product-categories")
@Tags('Product Category')
export class ProductCategoryController {
    private _productCategoryService: IProductCategoryService;

    constructor(
        productCategoryService: ProductCategoryService
    ) {
        this._productCategoryService = productCategoryService;
    }

    /**
     * Get all product categories
     */
    @Get("/")
    public async getProductCategorys(): Promise<ProductCategory[]> {
        return this._productCategoryService.getAll({});
    }
    /**
     * Create new product Category
     */
     @Security("jwt", [UserRole.ADMIN,UserRole.EDITOR])
    @Post("/")
    public async createProductCategory(@Body() data: ValidateCategoryModel): Promise<ProductCategory> {
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
    public async updateProductCategoryById(@Path() id: number, @Body() data: ValidateCategoryModel): Promise<ProductCategory> {
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