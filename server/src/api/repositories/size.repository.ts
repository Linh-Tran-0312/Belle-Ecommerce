import { getRepository } from "typeorm";
import { Size } from "../models";
import { BaseRepository, IBaseRepository } from "./base.repository";
import { Service } from "typedi";

export interface ISizeRepository extends IBaseRepository<Size> {}

@Service()
export class SizeRepository extends BaseRepository<Size> implements ISizeRepository{
    constructor() {
        super(getRepository(Size));
    }
} 