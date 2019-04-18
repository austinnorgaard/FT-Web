import { Table, Model, PrimaryKey, Column, ForeignKey, HasOne, BelongsTo, HasMany } from "sequelize-typescript";
import { AthleteSchema } from "./AthleteSchema";
import { SessionSchema } from "./SessionSchema";
import { Athlete } from "../../Athletes/athlete";
import { SegmentResultSchema } from "./SegmentResultSchema";

@Table({
    modelName: "SessionResult",
})
export class SessionResultSchema extends Model<SessionResultSchema> {
    @PrimaryKey
    @Column({autoIncrement: true})
    id: number;

    @ForeignKey(() => SessionSchema)
    @Column
    sessionId: number;

    @BelongsTo(() => SessionSchema)
    session: SessionSchema;

    @ForeignKey(() => AthleteSchema)
    @Column
    athleteId: number;

    @BelongsTo(() => AthleteSchema)
    athlete: AthleteSchema;

    // each SessionResult has 1 or more SegmentResults
    @HasMany(() => SegmentResultSchema)
    segmentResults: SegmentResultSchema[];
}