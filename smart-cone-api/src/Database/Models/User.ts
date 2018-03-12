import { Table, Column, Model, Unique, DataType } from "sequelize-typescript";
import { Options } from "@nestjs/common";

@Table
export class User extends Model<User> {
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

    @Column passwordHash: string;

    @Column passwordSalt: string;
}
