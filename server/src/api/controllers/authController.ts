import express from "express";
import { Body, Controller, Get, Post, Request, Route, Tags,Security } from "tsoa";
import { IUserAuth } from "../mappers";
import { AuthService, IRefreshMessage, IAuthService } from "../services";
import { ValidateLoginModel, ValidateUserCreateModel } from "../validations";
import { Service } from "typedi";
import { UserRole } from "../models";

const cookieOptions = {
  httpOnly: true,
  maxAge:3600000*5,
  secure:true,
  sameSite:'none',
}


@Service()
@Route("auth")
@Tags('Authorization')
export class AuthController extends Controller {
  private _authService: IAuthService;
  private cookies = {};

  constructor(
    authService: AuthService
  ) {
    super();
    this._authService = authService;
  }

   /**
   * Allow user get their profile if token in cookie is still valid
   */
  @Security("jwt", [UserRole.ADMIN, UserRole.EDITOR, UserRole.CUSTOMER])
  @Get("/user")
  public async getUserProfile(@Request() req: express.Request): Promise<IUserAuth|null> {
        const token = req.cookies.token;
        const profile = await this._authService.getProfile([UserRole.CUSTOMER], token);
        return profile
  }
  /**
   * Allow new users create their accounts
   */
  @Post("/user/register")
  public async register(@Body() data: ValidateUserCreateModel): Promise<IUserAuth> {
    const result = await this._authService.register(data);
    this.setCookies({
      token: {
        value: result.accessToken,
        options: {...cookieOptions}
      },
      refreshToken: {
        value: result.refreshToken,
        options:  {...cookieOptions}
      }
    });
    return result.profile
  }
  /**
   * Allow customers login with their email and password
   */
  @Post("/user/login")
  public async login(@Body() data: ValidateLoginModel): Promise<IUserAuth> {
    const result = await this._authService.login(data.email, data.password);
    this.setCookies({
      token: {
        value: result.accessToken,
        options:  {...cookieOptions}
      },
      refreshToken: {
        value: result.refreshToken,
        options: {...cookieOptions}
      }
    });
    return result.profile
  }

  /**
   * Allow admin and editor get their profile if token in cookie is still valid
   */
  @Security("jwt", [UserRole.ADMIN, UserRole.EDITOR])
  @Get("/admin")
  public async getAdminProfile(@Request() req: express.Request ): Promise<IUserAuth|null> {
        const token = req.cookies.token;
        const profile = await this._authService.getProfile([UserRole.ADMIN, UserRole.EDITOR], token);
         return profile;
        
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
        options:  {...cookieOptions}
      },
      refreshToken: {
        value: result.refreshToken,
        options:  {...cookieOptions}
      }
    });
    return result.profile
  }
  /**
   * Refresh expired access token, access token will be expired after 5 minutes, refresh token is 7 days
   */
  @Get("/token")
  public async RefreshToken(@Request() req: express.Request): Promise<IRefreshMessage> {
    const data = req.cookies.refreshToken;
    const result = await this._authService.refreshAccessToken({ refreshToken: data });
    this.setCookies({
      token: {
        value: result.token,
        options:  {...cookieOptions}
      }
    })
    return { message: "Refresh access token successfully" }
  }
  /**
 * Allow users logout (clear tokens in cookies)
 */
   @Get("logout")
   public async logout(): Promise<void> {
     this.setCookies({
       token: {
         value: "",
         options:  {...cookieOptions}
       },
       refreshToken: {
         value: "",
         options:  {...cookieOptions}
       }
     });
      
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