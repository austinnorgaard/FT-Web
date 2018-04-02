import { Component, Inject } from "@nestjs/common";
import { DatabaseResponse } from "../Database/Data/DatabaseResponse";
import { SaltAndHash } from "../Database/Data/SaltAndHash";
import { DatabaseFailureType } from "../Database/Data/DatabaseEnums";
import { UserRegistration } from "./user-registration";
import { User } from "./user";
import { UserSchema } from "../Database/Models/UserSchema";

var bcrypt = require("bcrypt");

@Component()
export class UsersService {
    //constructor(@Inject("UsersRepository") private readonly usersRepository: typeof User) {}

    async addUser(userRegistration: UserRegistration): Promise<DatabaseResponse> {
        let hash = await this.generateHash(userRegistration.password);

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
            passwordHash: hash
        });

        return await this.addUserToDb(dbUser);
    }

    async generateHash(password: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            bcrypt.genSalt(10, function(err, salt) {
                if (err) {
                    reject();
                }
                bcrypt.hash(password, salt, function(err, hash) {
                    if (err) {
                        reject();
                    }

                    resolve(hash);
                });
            });
        });
    }

    async addUserToDb(user: UserSchema): Promise<DatabaseResponse> {
        return new Promise<DatabaseResponse>((resolve, reject) => {
            user
                .save()
                .then(() => {
                    let response = new DatabaseResponse(true, "User added!");
                    resolve(response);
                })
                .catch(UniqueConstraintError => {
                    console.log("User already existed in the database!");

                    let response = new DatabaseResponse(
                        false,
                        "Unique constraint violated!",
                        DatabaseFailureType.UniqueConstraintViolated,
                        UniqueConstraintError.fields
                    );
                    reject(response);
                })
                .catch(err => {
                    let response = new DatabaseResponse(false, err);
                    reject(response);
                });
        });
    }

    async validateCredentials(providedEmail: string, providedPassword: string): Promise<boolean> {
        console.log("Validating credentials!");
        return new Promise<boolean>((resolve, reject) => {
            UserSchema.findOne({
                where: { email: providedEmail }
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
                    console.log(`Could not find account with email ${providedEmail}`);
                    reject(`Could not find account with email ${providedEmail}`);
                });
        });
    }
}
