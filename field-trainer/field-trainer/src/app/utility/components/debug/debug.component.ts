import { Component, OnInit } from "@angular/core";
import { FieldConesService } from "../../../session/services/field-cones.service";
import { FieldCone } from "../../../session/models/field-cone";

@Component({
    selector: "ft-debug",
    templateUrl: "./debug.component.html",
    styleUrls: ["./debug.component.css"],
})
export class DebugComponent implements OnInit {
    private fieldCones: FieldCone[] = [];
    constructor(private fieldConesService: FieldConesService) {}

    ngOnInit() {
        this.fieldConesService.getFieldCones().then(cones => {
            console.log(`Got field cones: ${cones}`);
        });
    }
}
