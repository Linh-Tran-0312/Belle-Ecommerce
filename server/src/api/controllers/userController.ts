import { Body, Delete, Get, Patch, Path, Post, Query, Res, TsoaResponse, Route, Tags } from "tsoa";
import { HttpCode } from "../helpers/HttpCode";
import { IUser, IUserCreateProps } from "../models";
import { BlogCommentService, UserService } from "../services";
export interface IUserUpdateProps {
    title?: string;
    categoryId?: number;
    imgPath?: string;
    content?: string;
    commentAllow?: boolean; 
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
    public async getUsers(): Promise<IUser[]> {
        return this._userService.getAll({});
    }

}