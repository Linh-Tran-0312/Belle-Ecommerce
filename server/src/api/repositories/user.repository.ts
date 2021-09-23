import { getRepository } from "typeorm";
import { BaseRepository,  } from "./base.repository";
import { User, IUser, IUserCreateProps } from "../models";
import { Service } from "typedi";

@Service({ id: "user-repository"})
export class UserRepository extends BaseRepository<IUser, User, IUserCreateProps>  {
    constructor() {
        super(getRepository(User));
    }
}