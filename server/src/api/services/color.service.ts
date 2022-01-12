import { Color } from "../models";
import { ColorRepository,IColorRepository } from "../repositories";
import { BaseService, IBaseService } from "./base.service";

export interface IColorService extends IBaseService<Color> {};

//@Service({ id: "OrderRepository-service"})
export class ColorService extends BaseService<Color, IColorRepository> implements IColorService  {
    constructor() {
        super(new ColorRepository())
    }
}