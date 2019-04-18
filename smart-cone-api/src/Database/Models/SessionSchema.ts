import { Table, Model, PrimaryKey, Column, BelongsToMany, HasMany } from "sequelize-typescript";
import { SessionResultSchema } from "./SessionResultSchema";

@Table({
    modelName: "Session"
})
export class SessionSchema extends Model<SessionSchema> {
    @PrimaryKey
    @Column({ autoIncrement: true})
    id: number;

    // TODO: Make this refer to an in-database structure!
    @Column
    fieldInfo: string;

    @Column
    courseInfo: string;

    @Column
    startTime: Date;

    @HasMany(() => SessionResultSchema)
    sessionResults: SessionResultSchema[];
}