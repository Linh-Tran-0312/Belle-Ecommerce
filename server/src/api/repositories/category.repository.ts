 import { getRepository } from "typeorm";
import { BaseRepository, IBaseRepository } from "./base.repository";
import { ProductCategory, IProductCategory, IProductCategoryCreateProps } from "../models";
import { Service } from "typedi";

export interface IProductCategoryRepository extends IBaseRepository<ProductCategory> {}

/* @Service({ id: "category-repository"}) */
export class ProductCategoryRepository extends BaseRepository<ProductCategory> implements IProductCategoryRepository {
    constructor() {
        super(getRepository(ProductCategory));
    }
}  