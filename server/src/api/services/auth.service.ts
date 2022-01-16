import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Not } from "typeorm";
import { UserService } from ".";
import { HttpCode } from "../helpers/HttpCode";
import { signAccessToken, signRefreshToken } from "../helpers/jwtHandler";
import { OperationalError, OperationalErrorMessage } from "../helpers/OperationalError";
import { TokenError } from "../helpers/TokenError";
import { IUserAuth, UserMapper } from "../mappers";
import { ValidateUserCreateModel } from "../validations";
import { Service } from "typedi";
import { IUserRepository, UserRepository } from "../repositories";

dotenv.config();

export interface IRefreshToken {
    refreshToken: string
}
export interface IAccessToken {
    token: string;
}
interface Token extends IRefreshToken, IAccessToken { }
export interface IRefreshMessage {
    message: string
}
export interface IAuth {
    refreshToken: string,
    accessToken: string,
    profile: IUserAuth
}
export interface IAuthService {
    register(data: ValidateUserCreateModel): Promise<IAuth>;
    login(email: string, password: string): Promise<IAuth>;
    adminLogin(email: string, password: string): Promise<IAuth>;
    refreshAccessToken(data: IRefreshToken): Promise<IAccessToken>
}
@Service()
export class AuthService extends UserService{

    constructor(
        userRepo: UserRepository
    ) {
        super(userRepo)
    }
    private async generateToken(id: number, role: string, timeAccess: number | string, timeRefresh: number | string): Promise<Token> {
        const accessToken = signAccessToken({ id, role }, timeAccess);
        const refreshToken = signRefreshToken({ id, role }, timeRefresh);
        return { refreshToken, token: accessToken };
    }
    public async register(data:  ValidateUserCreateModel): Promise<IAuth> {
        const existingEmail = await super.isEmailExist(data.email);
        if (!!existingEmail) throw new OperationalError(OperationalErrorMessage.EMAIL_INUSE, HttpCode.BAD_REQUEST);
        const hashPassword = await bcrypt.hash(data.password, 10);
        data.password = hashPassword;
        const user = await this.repository.create(data);
        const { token, refreshToken } = await this.generateToken(user.id, user.role, 300, "7d");
        await this.repository.create({ ...user, token: refreshToken });
        const result = { accessToken: token, refreshToken, profile: UserMapper.toUserAuth(user) }
        return result;
    }
    public async login(email: string, password: string): Promise<IAuth> {
        const existingUser = await this.repository.findOne({ where: { email } });
        if (!existingUser) throw new OperationalError(OperationalErrorMessage.EMAIL_NOTFOUND, HttpCode.BAD_REQUEST);
        const match = await bcrypt.compare(password, existingUser.password);
        if (!match) throw new OperationalError(OperationalErrorMessage.PASSWORD_WRONG, HttpCode.UNAUTHORIZED);
        const { token, refreshToken } = await this.generateToken(existingUser.id, existingUser.role, 300, "7d");
        await this.repository.create({ ...existingUser, token: refreshToken });
        const result = { accessToken: token, refreshToken, profile: UserMapper.toUserAuth(existingUser) }
        return result;
    }
    public async adminLogin(email: string, password: string): Promise<IAuth> {

        const existingUser  = await this.repository.findOne({ where: { email, role: Not("customer") } });
        if (!existingUser) throw new OperationalError(OperationalErrorMessage.EMAIL_NOTFOUND, HttpCode.BAD_REQUEST);
        const match = await bcrypt.compare(password, existingUser.password);
        if (!match) throw new OperationalError(OperationalErrorMessage.PASSWORD_WRONG, HttpCode.UNAUTHORIZED);
        const { token, refreshToken } = await this.generateToken(existingUser.id, existingUser.role, 300, "7d");
        await this.repository.create({ ...existingUser, token: refreshToken });
        const result = { accessToken: token, refreshToken, profile: UserMapper.toUserAuth(existingUser) }
        return result;
    }
    public async refreshAccessToken(data: IRefreshToken): Promise<IAccessToken> {
        const { refreshToken } = data;
        let token = "";
        if (!refreshToken) throw new TokenError(OperationalErrorMessage.NO_TOKEN)
        await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, async (err, decoded) => {
            if (err) {
                const payload: any = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, { ignoreExpiration: true });
                throw new TokenError(OperationalErrorMessage.INVALID_TOKEN, payload.role);
            }

            const user = await this.repository.findOne({ where: { id: decoded?.id } });
            if (refreshToken === user?.token) {
                token = signAccessToken({ id: decoded?.id, role: user?.role! }, 60);
            } else {
                throw new TokenError(OperationalErrorMessage.INVALID_TOKEN, decoded?.role);
            }
        })

        return { token }
    }
}

