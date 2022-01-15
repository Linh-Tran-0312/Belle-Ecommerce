import { Size } from "../models";
import { ISizeRepository, SizeRepository } from "../repositories";
import { BaseService, IBaseService } from "./base.service";


export interface ISizeName {
    name: string
}
export interface ISizeService extends IBaseService<Size> { };


//@Service({ id: "OrderRepository-service"})
export class SizeService extends BaseService<Size, ISizeRepository> implements ISizeService {
    constructor() {
        super(new SizeRepository())
    }
}