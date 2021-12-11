import { Body, Delete, Get, Patch, Path, Post, Route, Tags, Security } from "tsoa";
import { IProductCategory, IProductCategoryCreateProps, UserRole } from "../models";
import { ProductCategoryService } from "../services";

export interface IProductCategoryUpdateProps {
    name?: string;
    imgPath?: string;
}

@Route("product-categories")
@Tags('Product Category')
export class ProductCategoryController {
    private _productCategoryService: ProductCategoryService;

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
    public async createProductCategory(@Body() data: IProductCategoryCreateProps): Promise<IProductCategory> {
        return this._productCategoryService.create(data)
    }
    /**
    * Update product category info
    */
     @Security("jwt", [UserRole.ADMIN,UserRole.EDITOR])
    @Patch("/:id")
    public async updateProductCategoryById(@Path() id: number, @Body() data: IProductCategoryUpdateProps): Promise<IProductCategory> {
        return this._productCategoryService.update(id, data);
    }
    /**
     * Delete croduct category
     */
     @Security("jwt", [UserRole.ADMIN,UserRole.EDITOR])
    @Delete("/:id")
    public async deleteProductCategoryById(@Path() id: number): Promise<void> {
        return this._productCategoryService.delete(id);
    }
}