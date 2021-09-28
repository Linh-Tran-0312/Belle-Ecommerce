 import { getRepository } from "typeorm";
import { BaseRepository } from "./base.repository";
import { ProductCategory, IProductCategory, IProductCategoryCreateProps } from "../models";
import { Service } from "typedi";

@Service({ id: "category-repository"})
export class ProductCategoryRepository extends BaseRepository<IProductCategory, ProductCategory, IProductCategoryCreateProps>  {
    constructor() {
        super(getRepository(ProductCategory));
    }
}  