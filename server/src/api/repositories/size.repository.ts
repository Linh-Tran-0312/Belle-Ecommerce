 import { getRepository } from "typeorm";
import { Size } from "../models";
import { BaseRepository, IBaseRepository } from "./base.repository";

export interface ISizeRepository extends IBaseRepository<Size> {}

/* @Service({ id: "size-repository"}) */
export class SizeRepository extends BaseRepository<Size> implements ISizeRepository{
    constructor() {
        super(getRepository(Size));
    }
} 