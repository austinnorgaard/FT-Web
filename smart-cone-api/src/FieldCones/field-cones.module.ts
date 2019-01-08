import { Module } from "@nestjs/common";
import { FieldConesService } from "./field-cones.service";

@Module({
    providers: [FieldConesService],
    controllers: [],
    imports: [],
    exports: [FieldConesService],
})
export class FieldConesModule {}
