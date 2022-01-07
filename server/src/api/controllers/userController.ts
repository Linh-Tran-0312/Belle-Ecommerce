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
     * @param {number} limit
     * @param {number} page
     * @isInt limit
     * @minimum limit 1
     * @isInt page
     * @minimum page 1
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
            search: search?.trim(),
            role: role || UserRole.ALL,
            sort: sort || UserField.CREATEDAT,
            change: change || Change.DESC,
            limit: limit || 5,
            page: page || 1
        }
        return this._userService.getUsers(query);
    }
    /**
     * Get user and user's order list by user id
     */
    @Security("jwt", [UserRole.ADMIN, UserRole.EDITOR, UserRole.CUSTOMER])
    @Get("/:id")
    public async getUserById(@Path() id: number): Promise<IUser> {
        const user: any = await this._userService.getOneById(id,["orders"]);
        return user;
    }
     /**
     * Create new user with admin permission
     */
    @Security("jwt", [UserRole.ADMIN])
    @Post("/")
    public async createUser(@Body() data: IUserCreateProps): Promise<IUser> {
        return this._userService.createUser(data);
    }
    /**
     * Update user with admin permission
     */
     @Security("jwt", [UserRole.ADMIN, UserRole.EDITOR, UserRole.CUSTOMER])
     @Patch("/:id")
     public async updateUser(@Path() id: number,@Body() data: IUserUpdateProps): Promise<IUser> {
         
         return this._userService.updateUser(id,data);
     }
}