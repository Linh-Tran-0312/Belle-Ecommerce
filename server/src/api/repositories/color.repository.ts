 import { getRepository } from "typeorm";
import { Color } from "../models";
import { BaseRepository, IBaseRepository } from "./base.repository";
import { Service } from "typedi";

export interface IColorRepository extends IBaseRepository<Color> {}

@Service()
export class ColorRepository extends BaseRepository<Color> implements IColorRepository {
    constructor() {
        super(getRepository(Color));
    }
} 