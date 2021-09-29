import { Body, Delete, Get, Patch, Path, Post, Route, Query, Tags } from "tsoa";
import { IPagination } from "../repositories";
import { IProduct, IProductCreateProps } from "../models";
import { ProductService, IProductQuery, Change, SortField } from "../services";

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
        @Query() page?: number,
        @Query() sort?: SortField,
        @Query() change?: Change,
        @Query() search?: string,
        @Query() min?: number,
        @Query() max?: number,

    ): Promise<IPagination> {
        let query: IProductQuery = {
            category: 0,
            brand: 0,
            limit: 6,
            page: 0,
            sort: SortField.NAME,
            change: Change.DESC,
            search: "",
            min: 0,
            max: 0,
        }
        if(!!category && !isNaN(category)) query.category = category;
        if(!! brand && !isNaN(brand)) query.brand = brand;
        if(!!limit && !isNaN(limit)) query.limit = limit;
        if(!! page && !isNaN(page)) query.page = page;
        if(!!sort && sort.trim() !== "") query.sort = sort;
        if(!! change && change.trim() !== "") query.change = change;
        if(!! search && search.trim() !== "") query.search = search;
        if(!! min && !isNaN(min)) query.min = min;
        if(!!max && !isNaN(max)) query.max = max;
        console.log("Pro ctrl");
        return this._productService.getProducts(query);
    }
    /**
     * Get product details by its id
     */
     @Get("/:id")
     public async getProductById(@Path() id: number): Promise<IProduct|null> {
         return this._productService.getOneById(id, ["category","brand"]);
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