import { Component, Inject } from "@nestjs/common";
import { User } from "../Database/Models/User";
import { DatabaseResponse } from "../Database/Data/DatabaseResponse";
import { UserData } from "../Database/Data/UserData";
import { SaltAndHash } from "../Database/Data/SaltAndHash";
import { DatabaseFailureType } from "../Database/Data/DatabaseEnums";

var bcrypt = require("bcrypt");

@Component()
export class UsersService {
    //constructor(@Inject("UsersRepository") private readonly usersRepository: typeof User) {}

    async addUser(user: UserData): Promise<DatabaseResponse> {
        let saltAndHash = await this.generateSaltAndHash(user.password);

        const dbUser = new User({
            firstName: user.firstName,
            lastName: user.lastName,
            address1: user.address1,
            address2: user.address2,
            city: user.city,
            state: user.state,
            zipCode: user.zipCode,
            country: user.country,
            phoneNumber: user.phoneNumber,
            email: user.email,
            passwordHash: saltAndHash.hash,
            passwordSalt: saltAndHash.salt
        });

        return await this.addUserToDb(dbUser);
    }

    async generateSaltAndHash(password: string): Promise<SaltAndHash> {
        return new Promise<SaltAndHash>((resolve, reject) => {
            bcrypt.genSalt(10, function(err, salt) {
                if (err) {
                    reject();
                }
                bcrypt.hash(password, salt, function(err, hash) {
                    if (err) {
                        reject();
                    }

                    let result = new SaltAndHash();
                    result.hash = hash;
                    result.salt = salt;
                    resolve(result);
                });
            });
        });
    }

    async addUserToDb(user: User): Promise<DatabaseResponse> {
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
            User.findOne({
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
