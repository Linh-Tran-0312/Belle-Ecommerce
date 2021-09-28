import { Body, Post, Route, Tags } from "tsoa";
import { IUser, IUserCreateProps } from "../models";
import { UserService } from "../services";
export interface IUserUpdateProps {
    title?: string;
    categoryId?: number;
    imgPath?: string;
    content?: string;
    commentAllow?: boolean; 
}

export interface ILogin {
    email: string,
    password: string,
}

@Route("auth")
@Tags('Authorization')
export class AuthController {
    private _userService: UserService;

    constructor() {
        this._userService = new UserService();
    }

    /**
     * Allow new users create their accounts
     */
    @Post("/register")
    public async register(
        @Body() data: IUserCreateProps,
    ): Promise<IUser> {
        return  this._userService.register(data)
    }
  /**
     * Allow users login with their email and password
     */
    @Post("/login")
    public async login(@Body() data: ILogin): Promise<IUser> {
        return this._userService.login(data.email, data.password);
    }


}