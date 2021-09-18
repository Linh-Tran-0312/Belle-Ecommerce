import { getRepository } from "typeorm";
import { BaseRepository, IBaseRepository } from "./base.repository";
import { User } from "../models";
import { Service } from "typedi";

@Service({ id: "user-repository"})
export class UserRepository extends BaseRepository<User> implements IBaseRepository<User> {
    constructor() {
        super(getRepository(User));
    }
}