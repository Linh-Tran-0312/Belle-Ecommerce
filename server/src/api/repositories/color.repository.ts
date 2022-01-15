 import { getRepository } from "typeorm";
import { Color } from "../models";
import { BaseRepository, IBaseRepository } from "./base.repository";

export interface IColorRepository extends IBaseRepository<Color> {}

/* @Service({ id: "color-repository"}) */
export class ColorRepository extends BaseRepository<Color> implements IColorRepository {
    constructor() {
        super(getRepository(Color));
    }
} 