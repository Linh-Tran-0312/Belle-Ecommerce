 import { getRepository } from "typeorm";
import { BaseRepository, IBaseRepository } from "./base.repository";
import { Color, IBlogCreateProps, IColor, IColorCreateProps } from "../models";
import { Service } from "typedi";

export interface IColorRepository extends IBaseRepository<Color> {}

/* @Service({ id: "color-repository"}) */
export class ColorRepository extends BaseRepository<Color> implements IColorRepository {
    constructor() {
        super(getRepository(Color));
    }
} 