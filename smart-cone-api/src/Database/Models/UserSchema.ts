import { Table, Column, Model, Unique, DataType } from "sequelize-typescript";
import { Options } from "@nestjs/common";
import { User } from "../../Users/user";

@Table({
    modelName: "Users"
})
export class UserSchema extends Model<UserSchema> implements User {
    @Column subscribedToNewsLetter: boolean;

    @Column firstName: string;

    @Column lastName: string;

    @Column address1: string;

    @Column address2: string;

    @Column city: string;

    @Column state: string;

    @Column zipCode: string;

    @Column country: string;

    @Column phoneNumber: string;

    @Column({
        unique: "true"
    })
    email: string;

    // Field unique to the database, not sent over air
    @Column passwordHash: string;
}
