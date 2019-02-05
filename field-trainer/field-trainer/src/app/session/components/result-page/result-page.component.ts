import { Component, OnInit } from "@angular/core";
import { SessionService } from "../../services/session.service";
import { AthleteSessionArray, AthleteSession } from "@SmartCone/Training/athlete-session";
import { FlatTreeControl } from "@angular/cdk/tree";
import { MatTreeFlattener, MatTreeFlatDataSource } from "@angular/material";
import { Athlete } from "@SmartCone/Athletes/athlete";
import { Segment } from "@SmartCone/Training/segment";

import * as moment from "moment";
import { plainToClass } from "class-transformer";

// tslint:disable:member-ordering

interface NodeShape {
    expandable: boolean;
    name: string;
    level: number;
}

interface AthleteNode {
    athlete: Athlete;
    segments: Array<SegmentNode>;
}

interface SegmentNode {
    name: string;
    time: number;
}

@Component({
    selector: "ft-result-page",
    templateUrl: "./result-page.component.html",
    styleUrls: ["./result-page.component.css"],
})
export class ResultPageComponent implements OnInit {
    private transformer = (node: any, level: number) => {
        return {
            expandable: !!node.children && node.children.length > 0,
            name: node.name,
            level: level,
        };
    };

    private athleteSessions: AthleteSessionArray;
    public treeControl = new FlatTreeControl<NodeShape>(node => node.level, node => node.expandable);
    public treeFlattener = new MatTreeFlattener(this.transformer, node => node.level, node => node.expandable, node => node.children);
    public dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    public treeData: AthleteNode[] = [];

    constructor(private readonly sessionService: SessionService) {
        this.sessionService.getAthleteSessionsObservable().subscribe((athleteSessions: AthleteSessionArray) => {
            if (!athleteSessions || athleteSessions.items.length === 0) {
                return;
            }

            console.log(`Got ${athleteSessions.items.length} sessions`);
            this.athleteSessions = new AthleteSessionArray();
            athleteSessions.items.forEach(session => {
                console.log("adding session...");
                this.athleteSessions.items.push(plainToClass(AthleteSession, session));
            });

            this.athleteSessions = athleteSessions;

            this.buildTreeData();
        });
    }

    private buildTreeData() {
        this.treeData = [];
        this.athleteSessions.items.forEach((session: AthleteSession) => {
            console.log(session);
            // for each athlete, add a new entry to the tree data
            const index = this.treeData.push({ athlete: session.athlete, segments: [] });
            let segmentNum = 0;
            session.segments.forEach((segment: Segment) => {
                this.treeData[index - 1].segments.push({
                    name: `Segment #${segmentNum} - ${segment.action}`,
                    time: segment.duration,
                });

                segmentNum++;
            });
        });

        console.log(`Created ${this.athleteSessions.items.length} nodes`);
    }

    ngOnInit() {}

    hasChild = (_: number, node: NodeShape) => node.expandable;
}
