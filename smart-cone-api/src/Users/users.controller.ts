import { Controller, Post, Body, HttpException, HttpStatus } from "@nestjs/common";
import { UsersService } from "./users.service";
import { DatabaseFailureType } from "../Database/Data/DatabaseEnums";
import { UserRegistration } from "./user-registration";

@Controller("users")
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post()
    async create(@Body() userRegistration: UserRegistration) {
        // Adds a user to the database
        console.log("Creating user.");
        await this.usersService
            .addUser(userRegistration)
            .then(() => {
                console.log("User added!");
            })
            .catch(reason => {
                console.log(`Failed to add user. Reason: ${JSON.stringify(reason)}`);
                if (reason.failureType === DatabaseFailureType.UniqueConstraintViolated) {
                    throw new HttpException(reason, HttpStatus.CONFLICT);
                } else {
                    throw new HttpException(reason, HttpStatus.INTERNAL_SERVER_ERROR);
                }
            });
    }
}
