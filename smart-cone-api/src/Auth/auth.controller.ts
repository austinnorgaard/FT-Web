import { Controller, Post, HttpStatus, Get, HttpCode, Body, HttpException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginCredentials } from "./login-credentials";
import { JwtToken } from "./jwt-token";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("login")
    @HttpCode(HttpStatus.OK)
    public async login(@Body() credentials: LoginCredentials): Promise<JwtToken> {
        //return await this.authService.createToken(userData.email);
        try {
            let loginResult = await this.authService.login(credentials);
            return loginResult;
        } catch (e) {
            throw new HttpException("Email or password incorrect.", HttpStatus.UNAUTHORIZED);
        }
    }
}
