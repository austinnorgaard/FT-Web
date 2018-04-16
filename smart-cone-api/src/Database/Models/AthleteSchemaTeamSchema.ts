import { Table, Model, Column, ForeignKey } from "sequelize-typescript";
import { Athlete } from "../../Athletes/athlete";
import { AthleteSchema } from "./AthleteSchema";
import { TeamSchema } from "./TeamSchema";

@Table
export class AthleteSchemaTeamSchema extends Model<AthleteSchemaTeamSchema> {
    @ForeignKey(() => TeamSchema)
    @Column
    teamId: number;

    @ForeignKey(() => AthleteSchema)
    @Column
    athleteId: number;
}
