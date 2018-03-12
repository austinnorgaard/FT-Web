import { Table, Column, Model } from "sequelize-typescript";

@Table
export class Team extends Model<Team> {
    @Column({
        unique: "uniqueTeam"
    })
    teamName: string;

    @Column({
        unique: "uniqueTeam"
    })
    ageGroup: string;

    @Column({ unique: "uniqueTeam" })
    teamGender: string;
}
