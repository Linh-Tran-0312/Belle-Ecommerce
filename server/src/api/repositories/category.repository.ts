import { getRepository } from "typeorm";
import { BaseRepository, IBaseRepository } from "./base.repository";
import { ProductCategory } from "../models";
import { Service } from "typedi";

@Service({ id: "category-repository"})
export class ProductCategoryRepository extends BaseRepository<ProductCategory> implements IBaseRepository<ProductCategory> {
    constructor() {
        super(getRepository(ProductCategory));
    }
}