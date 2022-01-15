 import { getRepository } from "typeorm";
import { Brand } from "../models";
import { BaseRepository, IBaseRepository } from "./base.repository";

export interface IBrandRepository extends IBaseRepository<Brand> {}

/* @Service({ id: "brand-repository"}) */
export class BrandRepository extends BaseRepository<Brand>  implements IBrandRepository {
    constructor() {
        super(getRepository(Brand));
    }
}

