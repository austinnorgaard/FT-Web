import { Table, Column, Model } from "sequelize-typescript";

@Table
export class Team extends Model<Team> {
    @Column teamName: string;

    @Column ageGroup: string;

    @Column teamGender: string;
}
