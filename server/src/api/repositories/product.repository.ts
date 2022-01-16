 import { getRepository } from "typeorm";
import { IBaseRepository } from ".";
import { Product } from "../models";
import { BaseRepository } from "./base.repository";
import { Service } from "typedi";

export interface IProductRepository extends IBaseRepository<Product> {}

@Service() 
export class ProductRepository extends BaseRepository<Product> implements IProductRepository {
    constructor() {
        super(getRepository(Product));
    }
} 