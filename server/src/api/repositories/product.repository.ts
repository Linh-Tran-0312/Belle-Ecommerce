import { getRepository } from "typeorm";
import { BaseRepository, IBaseRepository } from "./base.repository";
import { Product } from "../models";
import { Service } from "typedi";

@Service({ id: "product-repository"})
export class ProductRepository extends BaseRepository<Product> implements IBaseRepository<Product> {
    constructor() {
        super(getRepository(Product));
    }
}