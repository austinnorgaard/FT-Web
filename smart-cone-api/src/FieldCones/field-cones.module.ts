import { Module, HttpModule } from "@nestjs/common";
import { FieldConesService } from "./field-cones.service";
import { FieldConesController } from "./field-cones.controller";
import { WifiModule } from "../Wifi/wifi.module";

@Module({
    providers: [FieldConesService],
    controllers: [FieldConesController],
    imports: [HttpModule, WifiModule],
    exports: [FieldConesService],
})
export class FieldConesModule {}
