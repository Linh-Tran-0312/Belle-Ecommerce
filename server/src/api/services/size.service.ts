import { Size } from "../models";
import { ISizeRepository, SizeRepository } from "../repositories";
import { BaseService, IBaseService } from "./base.service";
import { Service } from "typedi";


export interface ISizeName {
    name: string
}
export interface ISizeService extends IBaseService<Size> { };


@Service()
export class SizeService extends BaseService<Size, ISizeRepository> implements ISizeService {
    constructor(
        sizeRepo: SizeRepository
    ) {
        super(sizeRepo)
    }
}