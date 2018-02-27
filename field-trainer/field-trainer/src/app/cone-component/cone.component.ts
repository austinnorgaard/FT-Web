import { Component, Input } from "@angular/core";
import { Cone } from "../models/cone";

@Component({
    selector: "ft-cone",
    templateUrl: "./cone.component.html",
    styleUrls: ["./cone.component.css"]
})
export class ConeComponent {
    @Input() cone: Cone;
}
