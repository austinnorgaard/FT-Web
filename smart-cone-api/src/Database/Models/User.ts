import { Table, Column, Model } from "sequelize-typescript";

@Table
export class User extends Model<User> {
    @Column prefix: string;

    @Column firstName: string;

    @Column lastName: string;

    @Column address1: string;

    @Column address2: string;

    @Column city: string;

    @Column state: string;

    @Column zipCode: string;

    @Column country: string;

    @Column phoneNumber: string;

    @Column email: string;

    @Column passwordHash: string;

    @Column passwordSalt: string;
}
