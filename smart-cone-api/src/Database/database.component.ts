import { Component, OnModuleInit, OnModuleDestroy } from "@nestjs/common";

import { Sequelize } from "sequelize-typescript";
import { User } from "./Models/User";
import { Team } from "./Models/Team";
import { UserData } from "./Data/UserData";
import { AddTeamData } from "../../../field-trainer/field-trainer/src/app/models/add-team-data";

@Component()
export class DatabaseComponent implements OnModuleInit, OnModuleDestroy {
    private db;
    constructor() {
        this.db = null;
    }

    async onModuleInit() {
        "use strict";
        console.log("Initializing database.");
        console.log(__dirname);

        this.db = new Sequelize({
            database: "field-trainer-db",
            dialect: "sqlite",
            username: "root",
            password: "",
            storage: "./db/field-trainer-db.db",
            modelPaths: [__dirname + "/Models"]
        });

        // Make sure all required tables are built and db is ready to go before
        // moving on
        await this.db.sync();

        // const user = new User({
        //     prefix: "Mr.",
        //     firstName: "Keaton",
        //     lastName: "Freude",
        //     address1: "103 NE 25th Ave",
        //     address2: "#122",
        //     city: "Hillsboro",
        //     state: "Oregon",
        //     zipCode: "97124",
        //     country: "United States of America",
        //     phoneNumber: "5037404973",
        //     email: "freudek90@gmail.com",
        //     passwordHash: "Not a real hash",
        //     passwordSalt: "Not a real salt"
        // });

        // user
        //     .save()
        //     .then(() => {
        //         console.log("successfully added.");
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     });
    }

    onModuleDestroy() {
        throw new Error("Method not implemented.");
    }

    addUser(user: UserData): Promise<User> {
        // convert UserData, then return the
        // save promise
        const u = new User({
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
            passwordHash: user.passwordHash,
            passwordSalt: user.passwordSalt
        });

        return Promise.resolve(u.save());
    }

    addTeam(team: AddTeamData): Promise<Team> {
        const t = new Team({
            teamName: team.teamName,
            ageGroup: team.ageGroup,
            teamGender: team.teamGender
        });

        return Promise.resolve(t.save());
    }
}
