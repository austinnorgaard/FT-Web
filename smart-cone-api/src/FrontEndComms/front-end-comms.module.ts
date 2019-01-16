import { Module } from "@nestjs/common";
import { FrontEndCommunicator } from "./front-end-communicator.service";
import { FieldConesModule } from "../FieldCones/field-cones.module";

@Module({
    providers: [FrontEndCommunicator],
    imports: [FieldConesModule],
})
export class FrontEndCommsModule {}
