 import { getRepository } from "typeorm";
import { ProductCategory } from "../models";
import { BaseRepository, IBaseRepository } from "./base.repository";

export interface IProductCategoryRepository extends IBaseRepository<ProductCategory> {}

/* @Service({ id: "category-repository"}) */
export class ProductCategoryRepository extends BaseRepository<ProductCategory> implements IProductCategoryRepository {
    constructor() {
        super(getRepository(ProductCategory));
    }
}  