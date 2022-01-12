 import { getRepository } from "typeorm";
import { BaseRepository, IBaseRepository } from "./base.repository";
import { Brand, IBrand, IBrandCreateProps } from "../models";
import { Service } from "typedi";

export interface IBrandRepository extends IBaseRepository<Brand> {}

/* @Service({ id: "brand-repository"}) */
export class BrandRepository extends BaseRepository<Brand>  implements IBrandRepository {
    constructor() {
        super(getRepository(Brand));
    }
}

