import { Table, Column, AllowNull, Model, BelongsToMany } from "sequelize-typescript";
import { Athlete } from "../../Athletes/athlete";
import { Parent } from "../../Athletes/parent";
import { AthleteSchemaTeamSchema } from "./AthleteSchemaTeamSchema";
import { TeamSchema } from "./TeamSchema";
import { Team } from "../../Teams/Team";

@Table
export class AthleteSchema extends Model<AthleteSchema> implements Athlete {
    @Column firstName: string;
    @Column lastName: string;
    @Column email: string;
    @Column gender: string;
    @Column weight: number;
    @Column height: string;

    @AllowNull(true)
    @Column
    parent1Name: string;

    @AllowNull(true)
    @Column
    parent1Email: string;

    @AllowNull(true)
    @Column
    parent1Phone: string;

    @AllowNull(true)
    @Column
    parent2Name: string;

    @AllowNull(true)
    @Column
    parent2Email: string;

    @AllowNull(true)
    @Column
    parent2Phone: string;

    @BelongsToMany(() => TeamSchema, () => AthleteSchemaTeamSchema)
    teams: TeamSchema[];
}
