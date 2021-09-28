 import { getRepository } from "typeorm";
import { BaseRepository, IBaseRepository } from "./base.repository";
import { Brand, IBrand, IBrandCreateProps } from "../models";
import { Service } from "typedi";

@Service({ id: "brand-repository"})
export class BrandRepository extends BaseRepository<IBrand, Brand, IBrandCreateProps>  {
    constructor() {
        super(getRepository(Brand));
    }
}

