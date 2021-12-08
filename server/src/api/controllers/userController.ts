import { Body, Delete, Get, Patch, Path, Post, Query, Res, TsoaResponse,Security, Route, Tags } from "tsoa";
import { HttpCode } from "../helpers/HttpCode";
import { IUsers } from "../repositories";
import { IUser, IUserCreateProps, UserRole } from "../models";
import { UserService, IUserQuery, UserField, Change, IUserAuth  } from "../services";

export interface IUserUpdateProps {
    lname?: string;
    fname?: string;
    password?: string;
    email?: string;
    phone?: string;
    address?: string;
    role?: UserRole
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
     @Security("jwt", [UserRole.ADMIN])
    @Get("/")
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
    /**
     * Get user and user's order list by user id
     */
    @Get("/:id")
    public async getUserById(@Path() id: number): Promise<IUser|null> {
        const user: any = await this._userService.getOneById(id,["orders"]);
        return user;
    }
     /**
     * Create new user with admin permission
     */
    @Post("/")
    public async createUser(@Body() data: IUserCreateProps): Promise<IUser|null> {
        return this._userService.createUser(data);
    }
    /**
     * Update user with admin permission
     */
     @Patch("/:id")
     public async updateUser(@Path() id: number,@Body() data: IUserUpdateProps): Promise<IUser|null> {
         
         return this._userService.updateUser(id,data);
     }
}