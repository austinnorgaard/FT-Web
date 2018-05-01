import { Table, Column, Model, NotNull, AllowNull, HasMany, BelongsToMany, PrimaryKey } from "sequelize-typescript";
import { Team } from "../../Teams/Team";
import { Athlete } from "../../Athletes/athlete";
import { AthleteSchema } from "./AthleteSchema";
import { AthleteTeamSchema } from "./AthleteTeamSchema";

@Table({
    modelName: "Teams",
})
export class TeamSchema extends Model<TeamSchema> implements Team {
    @PrimaryKey
    @Column
    id: number;

    @AllowNull(false)
    @Column({
        unique: "uniqueTeam",
    })
    public teamName: string;

    @Column({
        unique: "uniqueTeam",
    })
    ageGroup: string;

    @Column({ unique: "uniqueTeam" })
    teamGender: string;

    @BelongsToMany(() => AthleteSchema, () => AthleteTeamSchema)
    teamAthletes: AthleteSchema[];
}
