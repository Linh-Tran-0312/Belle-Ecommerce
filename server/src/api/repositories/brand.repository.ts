 import { getRepository } from "typeorm";
import { Brand } from "../models";
import { BaseRepository, IBaseRepository } from "./base.repository";
import { Service } from "typedi";

export interface IBrandRepository extends IBaseRepository<Brand> {}

@Service()
export class BrandRepository extends BaseRepository<Brand>  implements IBrandRepository {
    constructor() {
        super(getRepository(Brand));
    }
}

