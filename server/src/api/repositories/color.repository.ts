 import { getRepository } from "typeorm";
import { BaseRepository, IBaseRepository } from "./base.repository";
import { Color, IBlogCreateProps, IColor, IColorCreateProps } from "../models";
import { Service } from "typedi";

@Service({ id: "color-repository"})
export class ColorRepository extends BaseRepository<IColor, Color, IColorCreateProps> implements IBaseRepository<Color> {
    constructor() {
        super(getRepository(Color));
    }
} 