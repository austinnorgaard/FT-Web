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
const users_service_1 = require("./users.service");
const DatabaseEnums_1 = require("../Database/Data/DatabaseEnums");
const user_registration_1 = require("./user-registration");
const file_logger_1 = require("../Logging/file-logger");
let UsersController = class UsersController {
    constructor(usersService, logger) {
        this.usersService = usersService;
        this.logger = logger;
    }
    async create(userRegistration) {
        this.logger.log("Creating user.");
        await this.usersService
            .addUser(userRegistration)
            .then(() => {
            this.logger.log("User added!");
        })
            .catch(reason => {
            this.logger.log(`Failed to add user. Reason: ${JSON.stringify(reason)}`);
            if (reason.failureType === DatabaseEnums_1.DatabaseFailureType.UniqueConstraintViolated) {
                throw new common_1.HttpException(reason, common_1.HttpStatus.CONFLICT);
            }
            else {
                throw new common_1.HttpException(reason, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_registration_1.UserRegistration]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
UsersController = __decorate([
    common_1.Controller("users"),
    __metadata("design:paramtypes", [users_service_1.UsersService, file_logger_1.FileLogger])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map