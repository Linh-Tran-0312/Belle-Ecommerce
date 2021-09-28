import { Body, Delete, Get, Patch, Path, Post, Route, Tags } from "tsoa";
import { IProductCategory, IProductCategoryCreateProps } from "../models";
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
    @Post("/")
    public async createProductCategory(@Body() data: IProductCategoryCreateProps): Promise<IProductCategory> {
        return this._productCategoryService.create(data)
    }
    /**
    * Update product category info
    */
    @Patch("/:id")
    public async updateProductCategoryById(@Path() id: number, @Body() data: IProductCategoryUpdateProps): Promise<IProductCategory> {
        return this._productCategoryService.update(id, data);
    }
    /**
     * Delete croduct category
     */
    @Delete("/:id")
    public async deleteProductCategoryById(@Path() id: number): Promise<void> {
        return this._productCategoryService.delete(id);
    }
}