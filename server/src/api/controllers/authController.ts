import express from "express";
import { Body, Controller, Get, Post, Request, Route, Tags } from "tsoa";
import { IUserAuth } from "../mappers";
import { AuthService, IRefreshMessage, IAuthService } from "../services";
import { ValidateLoginModel, ValidateUserCreateModel } from "../validations";

@Route("auth")
@Tags('Authorization')
export class AuthController  extends Controller {
    private   _authService: IAuthService ;
    private cookies = {};
   constructor() {
        super();
        this._authService = new AuthService();
    }  

    /**
     * Allow new users create their accounts
     */
    @Post("/register")
    public async register(@Body() data:  ValidateUserCreateModel): Promise<IUserAuth> {
        const result = await  this._authService.register(data);
        this.setCookies({
            token: {
              value: result.accessToken,
              options: {
                httpOnly: true
              }
            },
            refreshToken: {
              value: result.refreshToken,
              options: {
                httpOnly: true
              }
            }
          });
        return result.profile
    }
    /**
     * Allow customers login with their email and password
     */
    @Post("/login")
    public async login(@Body() data: ValidateLoginModel): Promise<IUserAuth> {
        const result = await this._authService.login(data.email, data.password);
        this.setCookies({
            token: {
              value: result.accessToken,
              options: {
                httpOnly: true
              }
            },
            refreshToken: {
              value: result.refreshToken,
              options: {
                httpOnly: true
              }
            }
          });
        return result.profile
    }
      /**
     * Allow admin and editors login with their email and password
     */
    @Post("/admin/login")
    public async adminLogin(@Body() data: ValidateLoginModel): Promise<IUserAuth> {       
        const result = await this._authService.adminLogin(data.email, data.password);
        this.setCookies({
            token: {
              value: result.accessToken,
              options: {
                httpOnly: true
              }
            },
            refreshToken: {
              value: result.refreshToken,
              options: {
                httpOnly: true
              }
            }
          });
        return result.profile
      
    }
    /**
     * Refresh expired access token
     */
    @Get("/token")
    public async RefreshToken(@Request() req: express.Request): Promise<IRefreshMessage> {
        const data = req.cookies.refreshToken;
       const result = await this._authService.refreshAccessToken({ refreshToken: data});
       this.setCookies({ token: {
        value: result.token,
        options: {
          httpOnly: true
        }
      }})
      return { message: "Refresh access token successfully"}
    }

    private setCookies(cookies: any) {
        this.cookies = cookies;
      }
    
    private getCookies() {
        const cookies = JSON.parse(JSON.stringify(this.cookies));
        this.cookies = {};
        return cookies;
      }

}