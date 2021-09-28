 import { Service } from "typedi";
import { getRepository } from "typeorm";
import { IProduct, IProductCreateProps, Product } from "../models";
import { BaseRepository } from "./base.repository";

@Service({ id: "product-repository"})
export class ProductRepository extends BaseRepository<IProduct, Product, IProductCreateProps>  {
    constructor() {
        super(getRepository(Product));
    }
} 