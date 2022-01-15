 import { getRepository } from "typeorm";
import { IBaseRepository } from ".";
import { Product } from "../models";
import { BaseRepository } from "./base.repository";

export interface IProductRepository extends IBaseRepository<Product> {}

/* @Service({ id: "product-repository"}) */
export class ProductRepository extends BaseRepository<Product> implements IProductRepository {
    constructor() {
        super(getRepository(Product));
    }
} 