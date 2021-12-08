import { Body, Post, Route, Tags } from "tsoa";
import { IUser, IUserCreateProps } from "../models";
import { UserService, IUserAuth } from "../services";


export interface ILogin {
    email: string,
    password: string,
}
export interface IRevokeToken {
    refreshToken: string
}
export interface IToken {
    token: string;
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
    public async register(@Body() data: IUserCreateProps): Promise<IUserAuth> {
        return  this._userService.register(data)
    }
    /**
     * Allow users login with their email and password
     */
    @Post("/login")
    public async login(@Body() data: ILogin): Promise< IUserAuth> {
        return this._userService.login(data.email, data.password);
    }
      /**
     * Allow admin and editer login with their email and password
     */
    @Post("/admin/login")
    public async adminLogin(@Body() data: ILogin): Promise<IUserAuth> {
        return this._userService.adminLogin(data.email, data.password);
    }
      /**
     * Revoke access token
     */
    @Post("/token")
    public async revokeToken(@Body() data: IRevokeToken): Promise<IToken> {
        return this._userService.revokeAccessToken(data);
    }


}