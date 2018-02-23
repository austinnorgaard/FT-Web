import { Controller, Post, Body } from "@nestjs/common";
import { UserData } from "./Data/UserData";
import { DatabaseComponent } from "./database.component";
@Controller("users")
export class UsersController {
    constructor(private database: DatabaseComponent) {}
    @Post()
    async create(@Body() userData: UserData) {
        console.log("Adding user via POST!");
        console.log(userData);
        // Adds a user to the database
        this.database
            .addUser(userData)
            .then(() => {
                console.log("User added!");
            })
            .catch(() => {
                console.log("Not able to add user!");
            });
    }
}
