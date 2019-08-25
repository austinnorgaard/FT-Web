import { Component, OnInit, Input } from "@angular/core";
import { FieldCone } from "@FieldTrainer/session/models/field-cone";

@Component({
    selector: "ft-field-cone",
    templateUrl: "./field-cone.component.html",
    styleUrls: ["./field-cone.component.css"],
})
export class FieldConeComponent implements OnInit {
    @Input() public coneInfo: FieldCone;
    constructor() {}

    ngOnInit() {}
}
