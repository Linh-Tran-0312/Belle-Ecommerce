import { getRepository } from "typeorm";
import { BaseRepository, IBaseRepository } from "./base.repository";
import { Brand } from "../models";
import { Service } from "typedi";

@Service({ id: "brand-repository"})
export class BrandRepository extends BaseRepository<Brand> implements IBaseRepository<Brand> {
    constructor() {
        super(getRepository(Brand));
    }
}



