import { IColor } from "../models";
import { ColorRepository } from "../repositories";
import { BaseService, IBaseService } from "./base.service";


//@Service({ id: "OrderRepository-service"})
export class ColorService extends BaseService<IColor, ColorRepository> implements IBaseService<IColor>  {
    constructor() {
        super(new ColorRepository())
    }
}