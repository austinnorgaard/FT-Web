import { Component, OnInit, Input } from "@angular/core";
import { Segment } from "@SmartCone/Training/segment";

@Component({
    selector: "ft-segment-details",
    templateUrl: "./segment-details.component.html",
    styleUrls: ["./segment-details.component.css"],
})
export class SegmentDetailsComponent implements OnInit {
    @Input() public segment: Segment;
    constructor() {}

    ngOnInit() {}

    getSegmentCompletionTime(): string {
        const timeDiff = (this.segment.endTime.getTime() - this.segment.startTime.getTime()) / 1000;

        return `${timeDiff} s`;
    }
}
