import { Body, Delete, Get, Patch, Path, Post, Route, Query, Tags, Security } from "tsoa";
import { IProducts } from "../repositories";
import { IProduct, IProductCreateProps, IProductVariant, IProductVariantCreateProps, UserRole } from "../models";
import { ProductService, IProductQuery, Change, ProductField, ProductVariantService } from "../services";

export interface IProductUpdateProps {
    sku?: string;
    categoryId?: number;
    brandId?: number;
    imgPaths?: string[];
    name?: string;
    summary?: string;
    description?: string;
    price?: number; 
}

export interface IProductVariantUpdateProps {
    colorId?: number;
    sizeId?: number;
    quantity?: number;
}

@Route("products")
@Tags('Product')
export class ProductController {
    private _productService: ProductService;
    private _productVariantService: ProductVariantService;
    constructor() {
        this._productService = new ProductService();
        this._productVariantService = new ProductVariantService();
    }

    /**
     * Get all products 
     * @param {number} category
     * @param {number} brand
     * @param {number} limit
     * @param {number} page
     * @param {number} min
     * @param {number} max
     * @isInt category
     * @minimum category 0
     * @isInt brand
     * @minimum brand 0
     * @isInt limit
     * @minimum limit 1
     * @isInt page
     * @minimum page 1
     * @isInt min
     * @minimum min 0
     * @isInt max
     * @minimum max 0
     */
    @Get("/")
    public async getProducts(
        @Query() category?: number,
        @Query() brand?: number,
        @Query() limit?: number,
        @Query() page?: number,
        @Query() sort?: ProductField,
        @Query() change?: Change,
        @Query() search?: string,
        @Query() min?: number,
        @Query() max?: number,

    ): Promise<IProducts> {
        let query: IProductQuery = {
            category,
            brand,
            limit: limit || 5,
            page: page || 1,
            sort: sort || ProductField.CREATEDAT,
            change: change || Change.DESC,
            search: search?.trim(),
            min,
            max,
        }

        return this._productService.getProducts(query);
    }
    /**
     * Get product details by its id
     */
     @Get("/:id")
     public async getProductById(@Path() id: number): Promise<IProduct> {
         return this._productService.getOneById(id, ["category","brand","variants","variants.color","variants.size"]);
     }
    /**
     * Create new product
     */
     @Security("jwt", [UserRole.ADMIN,UserRole.EDITOR])
    @Post("/")
    public async createProduct(@Body() data: IProductCreateProps): Promise<IProduct> {
        return this._productService.createProduct(data)
    }
    /**
    * Update product info
    */
     @Security("jwt", [UserRole.ADMIN,UserRole.EDITOR])
    @Patch("/:id")
    public async updateProductById(@Path() id: number, @Body() data: IProductUpdateProps): Promise<IProduct> {
        return this._productService.updateProduct(id, data);
    }
    /**
     * Delete product
     */
     @Security("jwt", [UserRole.ADMIN,UserRole.EDITOR])
    @Delete("/:id")
    public async deleteProductById(@Path() id: number): Promise<void> {
        return this._productService.delete(id);
    }
     /**
     * Create product variant
     */
      @Security("jwt", [UserRole.ADMIN,UserRole.EDITOR])
    @Post("/variant")
    public async createProductVariant(@Body() data: IProductVariantCreateProps): Promise<IProductVariant> {
        return this._productVariantService.createProductVariant(data);
    }
    /**
     * Update product variant 
     */
     @Security("jwt", [UserRole.ADMIN,UserRole.EDITOR])
    @Patch("/variant/:variantId")
    public async updateProductVariant(@Path() variantId: number, @Body() data: IProductVariantUpdateProps): Promise<IProductVariant> {
         return this._productVariantService.updateProductVariant(variantId, data)
    }
    /**
     * Delete product variant
     */
     @Security("jwt", [UserRole.ADMIN,UserRole.EDITOR])
    @Delete("/variant/:variantId")
    public async deleteProductVariant(@Path() variantId: number): Promise<void> {
        return this._productVariantService.delete(variantId)
    }

}