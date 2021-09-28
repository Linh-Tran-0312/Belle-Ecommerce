 import { Service } from "typedi";
import { getRepository } from "typeorm";
import { ISize, ISizeCreateProps, Size } from "../models";
import { BaseRepository } from "./base.repository";

@Service({ id: "size-repository"})
export class SizeRepository extends BaseRepository<ISize, Size, ISizeCreateProps> {
    constructor() {
        super(getRepository(Size));
    }
} 