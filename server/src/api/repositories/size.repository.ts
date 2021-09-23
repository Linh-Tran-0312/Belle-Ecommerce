/* import { getRepository } from "typeorm";
import { BaseRepository, IBaseRepository } from "./base.repository";
import { Size } from "../models";
import { Service } from "typedi";

@Service({ id: "size-repository"})
export class SizeRepository extends BaseRepository<Size> implements IBaseRepository<Size> {
    constructor() {
        super(getRepository(Size));
    }
} */