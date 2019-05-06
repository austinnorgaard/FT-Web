import { Component, OnInit } from "@angular/core";
import { SessionService } from "../../services/session.service";
import { AthleteSessionArray, AthleteSession, AthleteSessionCollection } from "@SmartCone/Training/athlete-session";
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

class AthleteNode {
    athlete: Athlete;
    segments: Array<SegmentNode>;
    public node_id = 1;

    formattedString: string;
}

class SegmentNode {
    name: string;
    time: number;
    node_id = 2;
    athlete: Athlete = null;
    segments: Array<SegmentNode> = [];

    formattedString: string;
}

@Component({
    selector: "ft-result-page",
    templateUrl: "./result-page.component.html",
    styleUrls: ["./result-page.component.css"],
})
export class ResultPageComponent implements OnInit {
    private transformer = (node: AthleteNode, level: number) => {
        return {
            expandable: node.node_id === 1 && node.segments.length > 0,
            name: node.formattedString,
            level: level,
        };
    };

    private athleteSessions: AthleteSessionArray;
    public treeControl = new FlatTreeControl<NodeShape>(node => node.level, node => node.expandable);
    public treeFlattener = new MatTreeFlattener(this.transformer, node => node.level, node => node.expandable, node => node.segments);
    public dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    public treeData: AthleteNode[] = [];

    constructor(private readonly sessionService: SessionService) {
        /*this.sessionService.getAthleteSessionsObservable().subscribe((athleteSessions: AthleteSessionArray) => {
            if (!athleteSessions || athleteSessions.sessions.length == 0 || athleteSessions.sessions[0].athleteSessions.length === 0) {
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
        });*/
    }

    private buildTreeData() {
        /*this.treeData = [];
        this.athleteSessions.items.forEach((session: AthleteSession) => {
            console.log(session);
            // for each athlete, add a new entry to the tree data
            const index = this.treeData.push({
                athlete: session.athlete,
                segments: [],
                node_id: 1,
                formattedString: `${session.athlete.firstName} ${session.athlete.lastName}`,
            });
            let segmentNum = 0;
            session.segments.forEach((segment: Segment) => {
                console.log(segment.duration);
                this.treeData[index - 1].segments.push({
                    name: `Segment ${segmentNum} - ${segment.action}`,
                    formattedString: `Segment ${segmentNum} - ${segment.action} - ${segment.duration / 1000}s`,
                    time: segment.duration,
                    node_id: 2,
                    athlete: undefined,
                    segments: [],
                });

                segmentNum++;
            });
        });

        console.log(`Created ${this.athleteSessions.items.length} nodes`);

        this.dataSource.data = this.treeData;*/
    }

    onSaveResults() {
        console.log("Saving results in backend");
    }

    ngOnInit() {}

    hasChild = (_: number, node: NodeShape) => node.expandable;
}
