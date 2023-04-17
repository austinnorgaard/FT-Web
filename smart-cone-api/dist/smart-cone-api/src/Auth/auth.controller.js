"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const login_credentials_1 = require("./login-credentials");
const file_logger_1 = require("../Logging/file-logger");
let AuthController = class AuthController {
    constructor(authService, logger) {
        this.authService = authService;
        this.logger = logger;
    }
    async login(credentials) {
        try {
            const loginResult = await this.authService.login(credentials);
            this.logger.log(loginResult);
            return loginResult;
        }
        catch (e) {
            if (e instanceof auth_service_1.EmailNotFoundError) {
                throw new common_1.HttpException("Email not found", common_1.HttpStatus.UNAUTHORIZED);
            }
            else if (e instanceof auth_service_1.PasswordIncorrectError) {
                this.logger.log("Password incorrect (controller)");
                throw new common_1.HttpException("Password incorrect", common_1.HttpStatus.UNAUTHORIZED);
            }
            else {
                this.logger.log("here?");
                throw new common_1.HttpException(`Unknown error: ${e}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
};
__decorate([
    common_1.Post("login"),
    common_1.HttpCode(common_1.HttpStatus.OK),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_credentials_1.LoginCredentials]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
AuthController = __decorate([
    common_1.Controller("auth"),
    __metadata("design:paramtypes", [auth_service_1.AuthService, file_logger_1.FileLogger])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map