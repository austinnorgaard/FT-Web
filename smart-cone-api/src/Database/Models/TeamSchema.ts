import { Table, Column, Model, NotNull, AllowNull, HasMany, BelongsToMany } from "sequelize-typescript";
import { Team } from "../../Teams/Team";
import { Athlete } from "../../Athletes/athlete";
import { AthleteSchemaTeamSchema } from "./AthleteSchemaTeamSchema";
import { AthleteSchema } from "./AthleteSchema";

@Table
export class TeamSchema extends Model<TeamSchema> implements Team {
    @AllowNull(false)
    @Column({
        unique: "uniqueTeam"
    })
    public teamName: string;

    @Column({
        unique: "uniqueTeam"
    })
    ageGroup: string;

    @Column({ unique: "uniqueTeam" })
    teamGender: string;

    @BelongsToMany(() => AthleteSchema, () => AthleteSchemaTeamSchema)
    teamAthletes: Athlete[];
}
