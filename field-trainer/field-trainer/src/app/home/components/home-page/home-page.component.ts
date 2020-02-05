import { Component, OnInit } from "@angular/core";
import { SmartConeUpdateService } from "../../services/smart-cone-update.service";

@Component({
    selector: "ft-home-page",
    templateUrl: "./home-page.component.html",
    styleUrls: ["./home-page.component.css"],
})
export class HomePageComponent implements OnInit {
    constructor(private readonly updateService: SmartConeUpdateService) {}

    ngOnInit() {}

    async updateSmartCone() {
        console.log(`Updating Smart Cone!`);

        await this.updateService.updateSmartCone();
    }
}
