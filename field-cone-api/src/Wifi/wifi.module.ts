import { Module } from "@nestjs/common";
import { WifiController } from "./wifi.controller";
import { WifiSettingsService } from "./wifi.service";

@Module({
    providers: [WifiSettingsService],
    controllers: [WifiController],
    imports: [],
    exports: [WifiSettingsService],
})
export class WifiModule {}
