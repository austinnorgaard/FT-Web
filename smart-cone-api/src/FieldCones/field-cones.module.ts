import { Module } from "@nestjs/common";
import { FieldConesService } from "./field-cones.service";
import { FieldConesController } from "./field-cones.controller";

@Module({
    providers: [FieldConesService],
    controllers: [FieldConesController],
    imports: [],
    exports: [FieldConesService],
})
export class FieldConesModule {}
