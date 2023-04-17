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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const DatabaseResponse_1 = require("../Database/Data/DatabaseResponse");
const DatabaseEnums_1 = require("../Database/Data/DatabaseEnums");
const UserSchema_1 = require("../Database/Models/UserSchema");
const bcrypt = require("bcryptjs");
const file_logger_1 = require("../Logging/file-logger");
let UsersService = class UsersService {
    constructor(logger) {
        this.logger = logger;
    }
    async addUser(userRegistration) {
        const hash = await this.generateHash(userRegistration.password);
        const dbUser = new UserSchema_1.UserSchema({
            firstName: userRegistration.user.firstName,
            lastName: userRegistration.user.lastName,
            address1: userRegistration.user.address1,
            address2: userRegistration.user.address2,
            city: userRegistration.user.city,
            state: userRegistration.user.state,
            zipCode: userRegistration.user.zipCode,
            country: userRegistration.user.country,
            phoneNumber: userRegistration.user.phoneNumber,
            email: userRegistration.user.email,
            passwordHash: hash,
        });
        return await this.addUserToDb(dbUser);
    }
    async generateHash(password) {
        return new Promise((resolve, reject) => {
            bcrypt.genSalt(10, (saltErr, salt) => {
                if (saltErr) {
                    reject();
                }
                bcrypt.hash(password, salt, (hashErr, hash) => {
                    if (hashErr) {
                        reject();
                    }
                    resolve(hash);
                });
            });
        });
    }
    async addUserToDb(user) {
        return new Promise((resolve, reject) => {
            user.save()
                .then(() => {
                const response = new DatabaseResponse_1.DatabaseResponse(true, "User added!");
                resolve(response);
            })
                .catch(UniqueConstraintError => {
                this.logger.log("User already existed in the database!");
                const response = new DatabaseResponse_1.DatabaseResponse(false, "Unique constraint violated!", DatabaseEnums_1.DatabaseFailureType.UniqueConstraintViolated, UniqueConstraintError.fields);
                reject(response);
            })
                .catch(err => {
                const response = new DatabaseResponse_1.DatabaseResponse(false, err);
                reject(response);
            });
        });
    }
    async validateCredentials(providedEmail, providedPassword) {
        this.logger.log("Validating credentials!");
        return new Promise((resolve, reject) => {
            UserSchema_1.UserSchema.findOne({
                where: { email: providedEmail },
            })
                .then(user => {
                bcrypt
                    .compare(providedPassword, user.passwordHash)
                    .then(res => {
                    resolve(res);
                })
                    .catch(err => {
                    reject(err);
                });
            })
                .catch(err => {
                this.logger.log(`Could not find account with email ${providedEmail}`);
                reject(`Could not find account with email ${providedEmail}`);
            });
        });
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [file_logger_1.FileLogger])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map