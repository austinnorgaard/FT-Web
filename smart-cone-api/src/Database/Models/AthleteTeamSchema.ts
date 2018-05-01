import { Table, Model, Column, ForeignKey } from "sequelize-typescript";
import { Athlete } from "../../Athletes/athlete";
import { AthleteSchema } from "./AthleteSchema";
import { TeamSchema } from "./TeamSchema";

@Table({
    modelName: "AthleteTeam",
})
export class AthleteTeamSchema extends Model<AthleteTeamSchema> {
    @ForeignKey(() => TeamSchema)
    @Column
    teamId: number;

    @ForeignKey(() => AthleteSchema)
    @Column
    athleteId: number;
}
