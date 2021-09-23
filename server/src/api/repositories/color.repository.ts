/* import { getRepository } from "typeorm";
import { BaseRepository, IBaseRepository } from "./base.repository";
import { Color } from "../models";
import { Service } from "typedi";

@Service({ id: "color-repository"})
export class ColorRepository extends BaseRepository<Color> implements IBaseRepository<Color> {
    constructor() {
        super(getRepository(Color));
    }
} */