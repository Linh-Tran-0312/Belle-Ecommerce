import { Body, Delete, Get, Patch, Path, Post, Route, Query, Tags } from "tsoa";
import { IProduct, IProductCreateProps } from "../models";
import { ProductService } from "../services";

export interface IProductUpdateProps {
    name?: string;
    code?: string;
}

@Route("products")
@Tags('Product')
export class ProductController {
    private _productService: ProductService;

    constructor() {
        this._productService = new ProductService();
    }

    /**
     * Get all products 
     */
    @Get("/")
    public async getProducts(
        @Query() category?: number,
        @Query() brand?: number,
        @Query() limit?: number,
        @Query() date?: string,
        @Query() search?: string,
        @Query() min?: number,
        @Query() max?: number,

    ): Promise<IProduct[]> {
        return this._productService.getAll({});
    }
    /**
     * Get product details by its id
     */
     @Get("/:id")
     public async getProductById(@Path() id: number): Promise<IProduct|null> {
         return this._productService.getOneById(id, ["category"]);
     }
    /**
     * Create new product
     */
    @Post("/")
    public async createProduct(@Body() data: IProductCreateProps): Promise<IProduct> {
        return this._productService.create(data)
    }
    /**
    * Update product info
    */
    @Patch("/:id")
    public async updateProductById(@Path() id: number, @Body() data: IProductUpdateProps): Promise<IProduct> {
        return this._productService.update(id, data);
    }
    /**
     * Delete product
     */
    @Delete("/:id")
    public async deleteProductById(@Path() id: number): Promise<void> {
        return this._productService.delete(id);
    }
}