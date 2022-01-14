import { Between, ILike, LessThanOrEqual, MoreThanOrEqual } from "typeorm";
import { IProduct, IProductCreateProps, Product } from "../models";
import { ProductRepository, IProductRepository } from "../repositories";
import { BaseService, IBaseService } from "./base.service";
import { ProductMapper, IProductSearchProps, IProductInfo, IVariantInfo } from "../mappers";

export enum Change {
    DESC = "DESC",
    ASC = "ASC"
}
export enum ProductField {
    PRICE = "price",
    NAME = "name",
    REVIEW = "overallReview",
    CREATEDAT = "createdAt"

}
export interface IProductQuery {
    category?: number,
    brand?: number,
    limit?: number,
    page?: number,
    search?: string,
    min?: number,
    max?: number,
    sort?: ProductField,
    change?: Change
}
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

export interface IProducts {
    products: IProductSearchProps[],
    total: number,
}

export interface IProductService extends IBaseService<Product> {
    getProducts(query: IProductQuery): Promise<IProducts>;
    getProductById(id: number): Promise<IProductInfo>
    createProduct(data: IProductCreateProps): Promise<IProductInfo>;
    updateProduct(id: number, data: IProductUpdateProps): Promise<IProductInfo>
}
//@Service({ id: "OrderRepository-service"})
export class ProductService extends BaseService<Product, IProductRepository> implements IProductService {
    constructor() {
        super(new ProductRepository())
    }
    public async getProducts(query: IProductQuery): Promise<IProducts> {
        let options: any = {
            select: ["id", "name", "sku", "price", "overallReview", "createdAt", "imgPaths"],
            relations: ["category", "brand"],
            where: {},
            order: {}

        };
        const whereCondition: any = {};
        if (query.category !== undefined) whereCondition.categoryId = query.category;
        if (query.brand !== undefined) whereCondition.brandId = query.brand;
        if (query.min !== undefined) whereCondition.price = MoreThanOrEqual(query.min);
        if (query.max !== undefined) whereCondition.price = LessThanOrEqual(query.max);
        if (query.min !== undefined && query.max !== undefined) whereCondition.price = Between(query.min, query.max);
        if (!query.search) {
            options.where = { ...whereCondition }
        } else {
            options.where = [
                {
                    name: ILike(`%${query.search}%`), ...whereCondition
                },
                {
                    sku: ILike(`%${query.search}%`), ...whereCondition
                },
                {
                    brand: {
                        name: ILike(`%${query.search}%`)
                    }
                    , ...whereCondition
                },
                {
                    category: {
                        name: ILike(`%${query.search}%`)
                    }, ...whereCondition
                }
            ];
        }
        options.order[`${query.sort}`] = query.change;
        options.take = query.limit;
        options.skip = options.take * (query.page! - 1);
        const [products, total] = await this.repository.findAndCount(options);
        const productSearch = products?.map(product => ProductMapper.toProductSearchProps(product))
        return { products: productSearch, total }
    }
    public async getProductById(id: number): Promise<IProductInfo> {
        const product = await this.getOneById(id, ["category", "brand", "variants", "variants.color", "variants.size"]);
        return ProductMapper.toProductInfo(product);
    }
    public async createProduct(data: IProductCreateProps): Promise<IProductInfo> {
        const { id } = await this.repository.create(data);
        return await this.getProductById(id);
    }
    public async updateProduct(id: number, data: IProductUpdateProps): Promise<IProductInfo> {
        await this.repository.update(id, data);
        return await this.getProductById(id);
    }

}