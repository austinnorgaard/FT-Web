import { Controller, Post, HttpStatus, Get, HttpCode, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserData } from "../Database/Data/UserData";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("token")
    @HttpCode(HttpStatus.OK)
    public async getToken(@Body() userData: UserData) {
        return await this.authService.createToken(userData.email);
    }

    @Get("authorized")
    public async authorized() {
        console.log("Authorized!");
    }
}
