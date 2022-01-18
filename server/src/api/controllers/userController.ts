import { Body, Get, Patch, Path, Post, Query, Route, Security, Tags } from "tsoa";
import { UserRole } from "../models";
import { Change, IUserQuery, IUsers, IUserWithOrders, UserField, UserService, IUserService } from "../services";
import { ValidateUserCreateModel, ValidateUserUpdateModel } from "../validations";
import { Service } from "typedi";

@Service()
@Route("users")
@Tags('User')
export class UserController {
    private _userService: IUserService;

    constructor(
        userService: UserService
    ) {
        this._userService = userService;
    }
    /**
     * Get all users
     * @param {number} limit
     * @param {number} page
     * @isInt limit Limit must be an integer
     * @minimum limit 1 Limit must be at least 1
     * @isInt page Page must be an integer
     * @minimum page 1 Page must be at least 1
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
            role,
            sort: sort || UserField.CREATEDAT,
            change: change || Change.DESC,
            limit: limit || 5,
            page: page || 1
        }
        return this._userService.getUsers(query);
    }
    /**
     * Get user and user's order list by user id
    * @param {number} id
    * @isInt id User id must be an integer
    * @minimum id 0 User id value must be at least 0
     */
    @Security("jwt", [UserRole.ADMIN, UserRole.EDITOR, UserRole.CUSTOMER])
    @Get("/:id")
    public async getUserById(@Path() id: number): Promise<IUserWithOrders> {
        return this._userService.getUserById(id);
         
    }
     /**
     * Create new user with admin permission
     */
    @Security("jwt", [UserRole.ADMIN])
    @Post("/")
    public async createUser(@Body() data:  ValidateUserCreateModel): Promise<IUserWithOrders> {
        return this._userService.createUser(data);
    }
    /**
     * Update user info
    * @param {number} id
    * @isInt id User id must be an integer
    * @minimum id 0 User id value must be at least 0
     */
     @Security("jwt", [UserRole.ADMIN, UserRole.EDITOR, UserRole.CUSTOMER])
     @Patch("/:id")
     public async updateUser(@Path() id: number,@Body() data:  ValidateUserUpdateModel): Promise<IUserWithOrders> {
         
         return this._userService.updateUser(id,data);
     }
}