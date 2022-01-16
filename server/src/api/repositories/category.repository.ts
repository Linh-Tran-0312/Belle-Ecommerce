 import { getRepository } from "typeorm";
import { ProductCategory } from "../models";
import { BaseRepository, IBaseRepository } from "./base.repository";
import { Service } from "typedi";

export interface IProductCategoryRepository extends IBaseRepository<ProductCategory> {}

@Service()
export class ProductCategoryRepository extends BaseRepository<ProductCategory> implements IProductCategoryRepository {
    constructor() {
        super(getRepository(ProductCategory));
    }
}  