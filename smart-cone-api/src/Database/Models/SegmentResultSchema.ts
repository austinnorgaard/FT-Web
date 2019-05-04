import { Table, Model, PrimaryKey, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { SessionResultSchema } from "./SessionResultSchema";

@Table({
    modelName: "SegmentResult",
})
export class SegmentResultSchema extends Model<SegmentResultSchema> {
    @PrimaryKey
    @Column({ autoIncrement: true })
    id: number;

    @Column({
        type: DataType.FLOAT,
    })
    duration: number;

    @Column
    action: string;

    @ForeignKey(() => SessionResultSchema)
    @Column
    sessionResultId: number;

    @BelongsTo(() => SessionResultSchema)
    sessionResult: SessionResultSchema;
}
