import { Body, Delete, Get, Patch, Path, Post, Query, Route, Security, Tags } from "tsoa";
import { IProductInfo, IVariantInfo } from "../mappers";
import { UserRole } from "../models";
import { Change, IProductQuery, IProducts, IProductService, IProductVariantService, ProductField, ProductService, ProductVariantService } from "../services";
import {  ValidateProductCreateModel, ValidateProductUpdateModel,  ValidateVariantCreateModel, ValidateVariantUpdateModel } from "../validations";
import { Service } from "typedi";

@Service()
@Route("products")
@Tags('Product')
export class ProductController {
    private _productService: IProductService;
    private _productVariantService: IProductVariantService;
    constructor(
        productService: ProductService,
        productVariantService: ProductVariantService
    ) {
        this._productService =  productService;
        this._productVariantService = productVariantService;
    }

    /**
     * Get all products 
     * @param {number} category
     * @param {number} brand
     * @param {number} limit
     * @param {number} page
     * @param {number} min
     * @param {number} max
    * @isInt category Product category id must be an integer
    * @minimum category 0 Product category id must be at least 0
     * @isInt brand Product brand id must be an integer
     * @minimum brand 0 Product brand id must be at least 0
     * @isInt limit Limit must be an integer
     * @minimum limit 1 Limit must be at least 1
     * @isInt page Page must be an integer
     * @minimum page 1 Page must be at least 1
     * @minimum min 0 Min price must be at least 0
     * @minimum max 0 Max price must be at least 0
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
    * @param {number} id
    * @isInt id Product id must be an integer
    * @minimum id 0 Product id must be at least 0
     */
     @Get("/:id")
     public async getProductById(@Path() id: number): Promise<IProductInfo> {
         return this._productService.getProductById(id);
     }
    /**
     * Create new product
     */
     @Security("jwt", [UserRole.ADMIN,UserRole.EDITOR])
    @Post("/")
    public async createProduct(@Body() data: ValidateProductCreateModel): Promise<IProductInfo> {
        return this._productService.createProduct(data)
    }
    /**
    * Update product info
    * @param {number} id
    * @isInt id Product id must be an integer
    * @minimum id 0 Product id must be at least 0
    */
     @Security("jwt", [UserRole.ADMIN,UserRole.EDITOR])
    @Patch("/:id")
    public async updateProductById(@Path() id: number, @Body() data: ValidateProductUpdateModel): Promise<IProductInfo> {
        return this._productService.updateProduct(id, data);
    }
    /**
     * Delete product
    * @param {number} id
    * @isInt id Product id must be an integer
    * @minimum id 0 Product id must be at least 0
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
    public async createProductVariant(@Body() data: ValidateVariantCreateModel): Promise<IVariantInfo> {
        return this._productVariantService.createProductVariant(data);
    }
    /**
     * Update product variant 
    * @param {number} variantId
    * @isInt variantId Product variant id must be an integer
    * @minimum variantId 0 Product variant id must be at least 0
     */
     @Security("jwt", [UserRole.ADMIN,UserRole.EDITOR])
    @Patch("/variant/:variantId")
    public async updateProductVariant(@Path() variantId: number, @Body() data: ValidateVariantUpdateModel): Promise<IVariantInfo> {
         return this._productVariantService.updateProductVariant(variantId, data)
    }
    /**
     * Delete product variant
    * @param {number} variantId
    * @isInt variantId Product variant id must be an integer
    * @minimum variantId 0 Product variant id must be at least 0
     */
     @Security("jwt", [UserRole.ADMIN,UserRole.EDITOR])
    @Delete("/variant/:variantId")
    public async deleteProductVariant(@Path() variantId: number): Promise<void> {
        return this._productVariantService.delete(variantId)
    }

}