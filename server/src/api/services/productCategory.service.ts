import { ProductCategory } from "../models";
import { ProductCategoryRepository,IProductCategoryRepository, ProductRepository } from "../repositories";
import { BaseService, IBaseService } from "./base.service";
import { Service } from "typedi";

export interface IProductCategoryService extends IBaseService<ProductCategory> {}
    
@Service()
export class ProductCategoryService extends BaseService<ProductCategory, IProductCategoryRepository> implements IProductCategoryService  {
    constructor(
        productCategoryRepository: ProductCategoryRepository
    ) {
        super(productCategoryRepository)
    }
}