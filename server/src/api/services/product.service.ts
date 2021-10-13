import { IProduct } from "../models";
import { ProductRepository, IPagination } from "../repositories";
import { BaseService, IBaseService } from "./base.service";
import { ILike, LessThanOrEqual, MoreThanOrEqual, } from "typeorm";

export enum Change {
    DESC = "DESC",
    ASC = "ASC"
}
export enum SortField {
    PRICE = "price",
    NAME = "name",
    REVIEW = "overallReview"

}
export interface IProductQuery  {
    category: number,
    brand: number,
    limit: number,
    page: number,
    search: string,
    min: number,
    max: number,
    sort: SortField,
    change: Change
}
//@Service({ id: "OrderRepository-service"})
export class ProductService extends BaseService<IProduct, ProductRepository> implements IBaseService<IProduct>  {
    constructor() {
        super(new ProductRepository())
    }
    public async getProducts(query: IProductQuery): Promise<IPagination> {
        try {
            let options: any = {
                where: {},
                order: {}
            };

            if(query.category > 0 ) options.where.categoryId = query.category;
            if(query.brand > 0 ) options.where.brandId = query.brand;
            if (!!query.search) options.where.name = ILike(`%${query.search}%`);
            if(query.min > 0) options.where.price = MoreThanOrEqual(query.min);
            if(query.max > 0) options.where.price = LessThanOrEqual(query.max);
            if(!!query.sort) options.order[`${query.sort}`] = Change.DESC;
            if(!!query.change) options.order[`${SortField.NAME}`] = query.change;
            if(!!query.sort && !!query.change ) options.order[`${query.sort}`] = query.change;
            if(query.limit > 0) options.take = query.limit;
            if(query.page > 0) options.skip = query.limit * (query.page - 1);   
            console.log("Pro service");
           const result: IPagination = await this.repository.findAndCount(options);
           if(!result) return { products: [], total: 0}
           return result
        } catch (error) {
            console.log(error);
            throw error
        }

        
    }

}