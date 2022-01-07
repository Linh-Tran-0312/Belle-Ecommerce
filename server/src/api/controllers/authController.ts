import { Body, Post, Route, Tags, Get, Controller, Request } from "tsoa";
import { IUser, IUserCreateProps, UserRole } from "../models";
import { AuthService, IUserAuth } from "../services";
import express from "express";

export interface ILogin {
  /** 
  * @pattern ^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$
  */
  email: string,
  password: string,
}
class CreateUserModel  {

  fname: string;
  lname: string;
   /** 
  * @pattern ^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$
  */
  email: string;
  password: string;
  role?: UserRole;
   /** 
  * @pattern [0-9]{10}
  */
  phone?: string;
  address?: string;

  constructor( fname: string,
    lname: string,
    email: string,
    password: string,
    role?: UserRole,
    phone?: string,
    address?: string) {
    this.fname = fname;
    this.lname = lname;
    this.email = email;
    this.role = role;
    this.phone = phone;
    this.password = password;
    this.address = address;
  }
}
export interface IRefreshToken {
    refreshToken: string
}
export interface IAccessToken {
    token: string;
}
interface IRefreshMessage {
    message: string
}
@Route("auth")
@Tags('Authorization')
export class AuthController  extends Controller {
    private   _authService: AuthService ;
    private cookies = {};
   constructor() {
        super();
        this._authService = new AuthService();
    }  

    /**
     * Allow new users create their accounts
     */
    @Post("/register")
    public async register(@Body() data: IUserCreateProps): Promise<IUser> {
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
    public async login(@Body() data: ILogin): Promise<IUser> {
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
    public async adminLogin(@Body() data: ILogin): Promise<IUser> {       
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