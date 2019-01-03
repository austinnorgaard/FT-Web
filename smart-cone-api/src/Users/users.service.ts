import { Injectable } from "@nestjs/common";
import { DatabaseResponse } from "../Database/Data/DatabaseResponse";
import { DatabaseFailureType } from "../Database/Data/DatabaseEnums";
import { UserRegistration } from "./user-registration";
import { UserSchema } from "../Database/Models/UserSchema";

import bcrypt = require("bcrypt");
import { FileLogger } from "../Logging/file-logger";

@Injectable()
export class UsersService {
    public constructor(private logger: FileLogger) {}

    async addUser(userRegistration: UserRegistration): Promise<DatabaseResponse> {
        const hash = await this.generateHash(userRegistration.password);

        const dbUser = new UserSchema({
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

    async generateHash(password: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
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

    async addUserToDb(user: UserSchema): Promise<DatabaseResponse> {
        return new Promise<DatabaseResponse>((resolve, reject) => {
            user.save()
                .then(() => {
                    const response = new DatabaseResponse(true, "User added!");
                    resolve(response);
                })
                .catch(UniqueConstraintError => {
                    this.logger.log("User already existed in the database!");

                    const response = new DatabaseResponse(
                        false,
                        "Unique constraint violated!",
                        DatabaseFailureType.UniqueConstraintViolated,
                        UniqueConstraintError.fields,
                    );
                    reject(response);
                })
                .catch(err => {
                    const response = new DatabaseResponse(false, err);
                    reject(response);
                });
        });
    }

    async validateCredentials(providedEmail: string, providedPassword: string): Promise<boolean> {
        this.logger.log("Validating credentials!");
        return new Promise<boolean>((resolve, reject) => {
            UserSchema.findOne({
                where: { email: providedEmail },
            })
                .then(user => {
                    // found the user, validate their password
                    // bcrypt stores the salt as part of the hash, so we only need to provide the hash
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
                    // probably dont care about this error, just couldn't find a user with this email
                    this.logger.log(`Could not find account with email ${providedEmail}`);
                    reject(`Could not find account with email ${providedEmail}`);
                });
        });
    }
}
