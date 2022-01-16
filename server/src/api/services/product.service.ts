import { Between, ILike, LessThanOrEqual, MoreThanOrEqual } from "typeorm";
import { IProductInfo, IProductSearchProps, ProductMapper } from "../mappers";
import { Product } from "../models";
import { IProductRepository, ProductRepository } from "../repositories";
import { ValidateProductModel } from "../validations";
import { BaseService, IBaseService } from "./base.service";
import { Service } from "typedi";
 
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

export interface IProducts {
    products: IProductSearchProps[],
    total: number,
}

export interface IProductService extends IBaseService<Product> {
    getProducts(query: IProductQuery): Promise<IProducts>;
    getProductById(id: number): Promise<IProductInfo>
    createProduct(data: ValidateProductModel): Promise<IProductInfo>;
    updateProduct(id: number, data:ValidateProductModel): Promise<IProductInfo>
}
@Service()
export class ProductService extends BaseService<Product, IProductRepository> implements IProductService {
    constructor(
        productRepository: ProductRepository
    ) {
        super(productRepository)
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
    public async createProduct(data: ValidateProductModel): Promise<IProductInfo> {
        const { id } = await this.repository.create(data);
        return await this.getProductById(id);
    }
    public async updateProduct(id: number, data: ValidateProductModel): Promise<IProductInfo> {
        await this.repository.update(id,data);
        return await this.getProductById(id);
    }

}