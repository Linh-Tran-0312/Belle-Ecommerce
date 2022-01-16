import { Brackets, getRepository } from "typeorm";
import { PostgresError } from "../helpers/PostgresError";
import { Status, User, UserRole } from "../models";
import { IUserQuery, IUsers } from "../services";
import { BaseRepository, IBaseRepository } from "./base.repository";
import { Service } from "typedi";

export interface IUserRepository extends IBaseRepository<User> {
    getUsers(query: IUserQuery): Promise<IUsers>
}

@Service()
export class UserRepository extends BaseRepository<User>  {
    constructor() {
        super(getRepository(User));
    }
    public async getUsers(query: IUserQuery): Promise<IUsers> {
        try {  
            console.log(query);    
            const userQuery  = this.entity.createQueryBuilder("user")
            .leftJoinAndSelect("user.orders","order","order.status != :status",{ status: Status.ORDERING})
            
            if(query.role !== UserRole.ALL && !!query.search)
            {
                console.log("dk1")
                userQuery.where("user.role = :role", { role: query.role})
                            .andWhere( new Brackets(qb => {
                                qb.where("user.fname ILike :fname", {fname: (`%${query.search}%`) })
                                .orWhere("user.lname ILike :lname", {lname: (`%${query.search}%`) })
                                .orWhere("user.phone ILike :phone", {phone: (`%${query.search}%`) })
                                .orWhere("user.email ILike :email", {email: (`%${query.search}%`) })
                                .orWhere("user.address ILike :address", {address: (`%${query.search}%`) })
                            }))
            }
            else if(!!query.search && query.role === UserRole.ALL)
            {
                console.log("dk2")
                userQuery.orWhere("user.fname ILike :fname", {fname: (`%${query.search}%`) })
                            .orWhere("user.lname ILike :lname", {lname: (`%${query.search}%`) })
                            .orWhere("user.phone ILike :phone", {phone: (`%${query.search}%`) })
                            .orWhere("user.email ILike :email", {email: (`%${query.search}%`) })
                            .orWhere("user.address ILike :address", {address: (`%${query.search}%`) })
            }
            else if(!query.search  && query.role !== UserRole.ALL){
                console.log("dk3")
                userQuery.where("user.role = :role", { role: query.role})
            }
            else {
                console.log("dk4");
            };
            userQuery.select(["user.id as id","user.fname as fname","user.lname as lname","user.phone as phone","user.address as address", "user.email as email", "user.role as role","user.createdAt as createdAt"])
                    .addSelect("COALESCE(SUM(order.total),0)", "sale")     
                    .groupBy("user.id")     
                    .offset(query.limit*(query.page - 1))
                    .limit(query.limit)
                    .orderBy(`${query.sort}`, query.change)

            const count = await userQuery.getCount();
            const result = await userQuery.getRawMany();
            return { users : result, total: count}
        } catch (err: any) {
            throw new PostgresError(err.message, err);
        }
       
    }
}