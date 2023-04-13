import { Controller, Post, Body, HttpException, HttpStatus } from "@nestjs/common";
import { UsersService } from "./users.service";
import { DatabaseFailureType } from "../Database/Data/DatabaseEnums";
import { UserRegistration } from "./user-registration";
import { FileLogger } from "../Logging/file-logger";

@Controller("user")
export class UsersController {
    constructor(private usersService: UsersService, private logger: FileLogger) {}

    @Post()
    async create(@Body() userRegistration: UserRegistration) {
        // Adds a user to the database
        this.logger.log("Creating user.");
        await this.usersService
            .addUser(userRegistration)
            .then(() => {
                this.logger.log("User added!");
            })
            .catch(reason => {
                this.logger.log(`Failed to add user. Reason: ${JSON.stringify(reason)}`);
                if (reason.failureType === DatabaseFailureType.UniqueConstraintViolated) {
                    throw new HttpException(reason, HttpStatus.CONFLICT);
                } else {
                    throw new HttpException(reason, HttpStatus.INTERNAL_SERVER_ERROR);
                }
            });
    }
}
