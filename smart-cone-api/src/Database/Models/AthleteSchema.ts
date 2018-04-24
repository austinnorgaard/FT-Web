import { Table, Column, AllowNull, Model, BelongsToMany, PrimaryKey } from "sequelize-typescript";
import { Athlete } from "../../Athletes/athlete";
import { Parent } from "../../Athletes/parent";
import { AthleteTeamSchema } from "./AthleteTeamSchema";
import { TeamSchema } from "./TeamSchema";
import { Team } from "../../Teams/Team";

@Table({
    modelName: "Athletes"
})
export class AthleteSchema extends Model<AthleteSchema> implements Athlete {
    @PrimaryKey
    @Column
    id: number;

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

    @BelongsToMany(() => TeamSchema, () => AthleteTeamSchema)
    teams: TeamSchema[];
}
