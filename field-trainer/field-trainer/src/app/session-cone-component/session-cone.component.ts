import { Component, Input } from '@angular/core';
import { SessionCone } from './session-cone';
@Component({
  selector: 'session-cone',
  templateUrl: './session-cone.component.html',
  styleUrls: ['./session-cone.component.css']
})
export class SessionConeComponent {
    @Input()
    details: SessionCone;

    onClick() {
        this.details.triggered = true;
    }

    getColor() {
        return this.details.triggered ? "lightgreen" : "white";
    }
}
