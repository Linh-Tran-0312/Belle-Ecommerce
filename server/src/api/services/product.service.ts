import { Between, ILike, LessThanOrEqual, MoreThanOrEqual } from "typeorm";
import { IProduct, IProductCreateProps, Product } from "../models";
import { ProductRepository,IProductRepository } from "../repositories";
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
export interface IProductQuery  {
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
    updateProduct(id: number, data: IProductUpdateProps ): Promise<IProductInfo>
}
//@Service({ id: "OrderRepository-service"})
export class ProductService extends BaseService<Product, IProductRepository> implements IProductService  {
    constructor() {
        super(new ProductRepository())
    }
    public async getProducts(query: IProductQuery): Promise<IProducts> {
            let options: any = {
                select: ["id","name","sku","price","overallReview","createdAt", "imgPaths"],
                relations: ["category","brand"],
                where: {},
                order: {}
                
            };

            if(query.category !== undefined) options.where.categoryId = query.category;
            if(query.brand !== undefined) options.where.brandId = query.brand;
            if (!!query.search) options.where= [
                {
                    name:  ILike(`%${query.search}%`)
                },
                {
                    sku:  ILike(`%${query.search}%`)
                },
                {
                    brand: {
                        name:  ILike(`%${query.search}%`)
                    }
                },
                {
                    category: {
                        name:  ILike(`%${query.search}%`)
                    }
                }
            ];
            if(query.min !== undefined) options.where.price = MoreThanOrEqual(query.min);
            if(query.max !== undefined) options.where.price = LessThanOrEqual(query.max);
            if(query.min !== undefined && query.max !== undefined )  options.where.price = Between(query.min,query.max);
            options.order[`${query.sort}`] = query.change;
            if(query.limit) options.take = query.limit;
            if(query.page) options.skip = options.take*(query.page - 1);
            const [products, total] = await this.repository.findAndCount(options);
            const productSearch = products?.map(product => ProductMapper.toProductSearchProps(product)) 
           return { products: productSearch, total}
    }
    public async getProductById(id: number): Promise<IProductInfo> {
        const product = await this.getOneById(id,["category","brand","variants","variants.color","variants.size"]);
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