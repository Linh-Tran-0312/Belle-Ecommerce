/* import { getRepository } from "typeorm";
import { BaseRepository, IBaseRepository } from "./base.repository";
import { ProductComment } from "../models";
import { Service } from "typedi";

@Service({ id: "productComment-repository"})
export class ProductCommentRepository extends BaseRepository<ProductComment> implements IBaseRepository<ProductComment> {
    constructor() {
        super(getRepository(ProductComment));
    }
} */