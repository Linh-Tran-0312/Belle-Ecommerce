import { IProduct, IProductCreateProps } from "../models";
import { ProductRepository, IProducts } from "../repositories";
import { BaseService, IBaseService } from "./base.service";
import { ILike, LessThanOrEqual, MoreThanOrEqual, Between } from "typeorm";
import { IProductUpdateProps } from "../controllers/productController";
import { OperationalError, OperationalErrorMessage } from "../helpers/OperationalError";
import { HttpCode } from "../helpers/HttpCode";

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
    category: number,
    brand: number,
    limit: number,
    page: number,
    search: string,
    min: number,
    max: number,
    sort: ProductField,
    change: Change
}
//@Service({ id: "OrderRepository-service"})
export class ProductService extends BaseService<IProduct, ProductRepository> implements IBaseService<IProduct>  {
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

            if(query.category > 0 ) options.where.categoryId = query.category;
            if(query.brand > 0 ) options.where.brandId = query.brand;
            if (!!query.search) options.where.name = ILike(`%${query.search}%`);
            if(query.min > 0) options.where.price = MoreThanOrEqual(query.min);
            if(query.max > 0) options.where.price = LessThanOrEqual(query.max);
            if(query.min > 0 && query.max > 0 )  options.where.price = Between(query.min,query.max);
            if(!!query.sort && !!query.change ) options.order[`${query.sort}`] = query.change;
            if(query.limit > 0) options.take = query.limit;
            if(query.page > 0) options.skip = query.limit * (query.page - 1);   
           const result: IProducts = await this.repository.findAndCount(options);
           return result 
    }
    public async createProduct(data: IProductCreateProps): Promise<IProduct> {
        const { id } = await this.repository.create(data);
        const newProduct: IProduct| null= await this.repository.findOne({
            where: {
                id: id
            },
            relations: ["category","brand","variants","variants.color","variants.size"]
        });
        if(!newProduct) throw new OperationalError(OperationalErrorMessage.NOT_FOUND, HttpCode.NOT_FOUND);
        return newProduct;
    }
    public async updateProduct(id: number, data: IProductUpdateProps ): Promise<IProduct> {
        await this.repository.update(id, data);
        const updatedProduct: IProduct|null = await this.repository.findOne({
            where: {
                id: id
            },
            relations: ["category","brand","variants","variants.color","variants.size"]
        });
        if(!updatedProduct) throw new OperationalError(OperationalErrorMessage.NOT_FOUND, HttpCode.NOT_FOUND);
        return updatedProduct;
    }

}