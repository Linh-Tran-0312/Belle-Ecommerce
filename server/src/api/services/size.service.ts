import { ISize } from "../models";
import { SizeRepository } from "../repositories";
import { BaseService, IBaseService } from "./base.service";


//@Service({ id: "OrderRepository-service"})
export class SizeService extends BaseService<ISize, SizeRepository> implements IBaseService<ISize>  {
    constructor() {
        super(new SizeRepository())
    }
}