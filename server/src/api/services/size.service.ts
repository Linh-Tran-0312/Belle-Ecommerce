import { ISize, Size } from "../models";
import { SizeRepository, ISizeRepository } from "../repositories";
import { BaseService, IBaseService } from "./base.service";

export interface ISizeService extends IBaseService<Size> { };


//@Service({ id: "OrderRepository-service"})
export class SizeService extends BaseService<Size, ISizeRepository> implements ISizeService {
    constructor() {
        super(new SizeRepository())
    }
}