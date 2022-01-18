import express from "express";
import { Body, Controller, Get, Post, Request, Route, Tags,Res, TsoaResponse } from "tsoa";
import { IUserAuth } from "../mappers";
import { AuthService, IRefreshMessage, IAuthService } from "../services";
import { ValidateLoginModel, ValidateUserCreateModel } from "../validations";
import { Service } from "typedi";
import { UserRole } from "../models";

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
  @Post("/user/login")
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
   * Allow admin and editor get their profile if token in cookie is still valid
   */
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
    const result = await this._authService.refreshAccessToken({ refreshToken: data });
    this.setCookies({
      token: {
        value: result.token,
        options: {
          httpOnly: true
        }
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
         options: {
           httpOnly: true
         }
       },
       refreshToken: {
         value: "",
         options: {
           httpOnly: true
         }
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