 import { Service } from "typedi";
import { getRepository } from "typeorm";
import { IProduct, IProductCreateProps, Product } from "../models";
import { BaseRepository } from "./base.repository";
import { PostgresError } from "../helpers/PostgresError";
import { IBaseRepository } from ".";
import { IProductCategoryRepository } from "./category.repository";

export interface IProductRepository extends IBaseRepository<Product> {}

/* @Service({ id: "product-repository"}) */
export class ProductRepository extends BaseRepository<Product> implements IProductRepository {
    constructor() {
        super(getRepository(Product));
    }
} 