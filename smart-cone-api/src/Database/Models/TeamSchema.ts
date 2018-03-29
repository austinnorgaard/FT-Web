import { Table, Column, Model, NotNull, AllowNull } from "sequelize-typescript";
import { Team } from "../../Teams/Team";

@Table
export class TeamSchema extends Model<TeamSchema> implements Team {
    constructor(team?: Team) {
        super();
        Object.assign(this, team);
    }

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
