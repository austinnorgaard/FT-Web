import { Component, OnInit } from "@angular/core";
import { SmartConeUpdateService } from "../../services/smart-cone-update.service";
import { Package, SmartConeInfo, SmartConeInfoService } from "../../services/smart-cone-info.service";

@Component({
    selector: "ft-home-page",
    templateUrl: "./home-page.component.html",
    styleUrls: ["./home-page.component.css"],
})
export class HomePageComponent implements OnInit {
    smartConeInfo: SmartConeInfo = undefined;
    constructor(private readonly updateService: SmartConeUpdateService, private readonly infoService: SmartConeInfoService) {}

    async ngOnInit() {
        this.smartConeInfo = await this.infoService.getSmartConeInfo();
    }

    async updateSmartCone() {
        console.log(`Updating Smart Cone!`);

        await this.updateService.updateSmartCone();
    }
}
