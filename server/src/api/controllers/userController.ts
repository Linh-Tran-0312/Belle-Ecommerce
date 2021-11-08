import { Body, Delete, Get, Patch, Path, Post, Query, Res, TsoaResponse, Route, Tags } from "tsoa";
import { HttpCode } from "../helpers/HttpCode";
import { IUsers } from "../repositories";
import { IUser, IUserCreateProps, UserRole } from "../models";
import { UserService, IUserQuery, UserField, Change  } from "../services";

export interface IUserUpdateProps {
    lname?: string;
    fname?: string;
    password?: string;
    email?: string;
    phone?: string;
    address?: string;
}

@Route("users")
@Tags('User')
export class UserController {
    private _userService: UserService;

    constructor() {
        this._userService = new UserService();
    }
    /**
     * Get all users
     */
    @Get()
    public async getUsers(
        @Query() search?: string,
        @Query() role?: UserRole,
        @Query() limit?: number,
        @Query() page?: number,
        @Query() sort?: UserField,
        @Query() change?: Change

    ): Promise<IUsers> {
        const query: IUserQuery = {
            search: "",
            role: UserRole.ALL,
            sort: UserField.CREATEDAT,
            change: Change.DESC,
            limit: 2,
            page: 1
        }
        if(!!role  && role.trim() !== "") {
            query.role = role;
        }
        if(!!limit  && !isNaN(limit)) {
            query.limit = limit;
        }
        if(!!page && !isNaN(page))
        {
            query.page = page
        }
        if(!!sort && sort.trim() !== "")
        {
            query.sort = sort
        }
         if(!!change && change.trim() !== "") {
            query.change = change;
         }
         if(!!search && search.trim() !== "") {
            query.search = search;
         }
        return this._userService.getUsers(query);
    }
    @Get("/:id")
    public async getUserById(@Path() id: number): Promise<IUser|null> {
        const user: any = await this._userService.getOneById(id,["orders"]);
        console.log(user);
        return user;
    }
}