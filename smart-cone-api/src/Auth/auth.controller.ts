import { Controller, Post, HttpStatus, HttpCode, Body, HttpException } from "@nestjs/common";
import { AuthService, EmailNotFoundError, PasswordIncorrectError } from "./auth.service";
import { LoginCredentials } from "./login-credentials";
import { JwtToken } from "./jwt-token";
import { FileLogger } from "../Logging/file-logger";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService, private logger: FileLogger) {}

    @Post("login")
    @HttpCode(HttpStatus.OK)
    public async login(@Body() credentials: LoginCredentials): Promise<JwtToken> {
        try {
            const loginResult = await this.authService.login(credentials);
            this.logger.log(loginResult);
            return loginResult;
        } catch (e) {
            if (e instanceof EmailNotFoundError) {
                throw new HttpException("Email not found", HttpStatus.UNAUTHORIZED);
            } else if (e instanceof PasswordIncorrectError) {
                this.logger.log("Password incorrect (controller)");
                throw new HttpException("Password incorrect", HttpStatus.UNAUTHORIZED);
            } else {
                this.logger.log("here?");
                // unknown exception, return general server failure
                throw new HttpException(`Unknown error: ${e}`, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
}
