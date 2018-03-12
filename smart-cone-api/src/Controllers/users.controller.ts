import { Controller, Post, Body } from "@nestjs/common";
import { UserData } from "../Database/Data/UserData";
import { UsersService } from "../Services/users.service";

@Controller("users")
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post()
    async create(@Body() userData: UserData) {
        // Adds a user to the database
        console.log("Creating user.");
        await this.usersService
            .addUser(userData)
            .then(() => {
                console.log("User added!");
                return;
            })
            .catch(reason => {
                console.log(`Failed to add user. Reason: ${JSON.stringify(reason)}`);
                return;
            });
    }
}
