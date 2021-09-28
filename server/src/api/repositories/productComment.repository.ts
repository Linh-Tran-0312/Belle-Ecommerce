 import { getRepository } from "typeorm";
import { BaseRepository } from "./base.repository";
import { ProductComment, IProductComment, IProductCommentCreateProps } from "../models";
import { Service } from "typedi";

@Service({ id: "productComment-repository"})
export class ProductCommentRepository extends BaseRepository<IProductComment, ProductComment, IProductCommentCreateProps>  {
    constructor() {
        super(getRepository(ProductComment));
    }
} 