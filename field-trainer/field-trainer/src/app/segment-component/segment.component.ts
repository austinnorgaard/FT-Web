import { Component, Input } from '@angular/core';
import { Segment } from '../data/segment';

@Component({
  selector: 'ft-segment',
  templateUrl: './segment.component.html',
  styleUrls: ['./segment.component.css']
})
export class SegmentComponent {
    @Input()
    details: Segment;
}
