import { Color } from "../models";
import { ColorRepository,IColorRepository } from "../repositories";
import { BaseService, IBaseService } from "./base.service";
import { Service} from  "typedi";
export interface IColorName {
    name: string
}
export interface IColorService extends IBaseService<Color> {};

@Service()
export class ColorService extends BaseService<Color, IColorRepository> implements IColorService  {
    constructor(
        colorRepository: ColorRepository
    ) {
        super(colorRepository)
    }
}