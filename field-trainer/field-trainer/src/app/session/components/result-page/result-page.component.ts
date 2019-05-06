import { Component, OnInit } from "@angular/core";
import { SessionService } from "../../services/session.service";
import { AthleteSessionArray, AthleteSession, AthleteSessionCollection } from "@SmartCone/Training/athlete-session";
import { FlatTreeControl } from "@angular/cdk/tree";
import { MatTreeFlattener, MatTreeFlatDataSource } from "@angular/material";
import { Athlete } from "@SmartCone/Athletes/athlete";
import { Segment } from "@SmartCone/Training/segment";

import * as moment from "moment";
import { plainToClass } from "class-transformer";

@Component({
    selector: "ft-result-page",
    templateUrl: "./result-page.component.html",
    styleUrls: ["./result-page.component.css"],
})
export class ResultPageComponent implements OnInit {
    constructor(private readonly sessionService: SessionService) {}

    onSaveResults() {
        console.log("Saving results in backend");
    }

    ngOnInit() {}
}
