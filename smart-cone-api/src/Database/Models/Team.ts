import { Table, Column, Model, NotNull, AllowNull } from "sequelize-typescript";

@Table
export class Team extends Model<Team> {
    @AllowNull(false)
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
