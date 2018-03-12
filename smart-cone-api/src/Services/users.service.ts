import { Component, Inject } from "@nestjs/common";
import { User } from "../Database/Models/User";
import { DatabaseResponse } from "../Database/Data/DatabaseResponse";
import { UserData } from "../Database/Data/UserData";
import { SaltAndHash } from "../Database/Data/SaltAndHash";
import { DatabaseFailureType } from "../Database/Data/DatabaseEnums";

var bcrypt = require("bcrypt");

@Component()
export class UsersService {
    constructor(@Inject("UsersRepository") private readonly usersRepository: typeof User) {}

    async addUser(user: UserData): Promise<DatabaseResponse> {
        let saltAndHash = await this.generateSaltAndHash(user.password);

        const dbUser = new User({
            prefix: user.prefix,
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
                    let response: DatabaseResponse = new DatabaseResponse(true, "User added!");
                    resolve(response);
                })
                .catch(UniqueConstraintError => {
                    console.log("User already existed in the database!");

                    let response: DatabaseResponse = new DatabaseResponse(
                        false,
                        "Unique constraint violated!",
                        DatabaseFailureType.UniqueConstraintViolated,
                        UniqueConstraintError.fields
                    );
                    reject(response);
                })
                .catch(err => {
                    let response: DatabaseResponse = new DatabaseResponse(false, err);
                    reject(response);
                });
        });
    }
}
