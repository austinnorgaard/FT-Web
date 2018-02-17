import { Component, Input } from '@angular/core';

@Component({
  selector: 'ft-session-cone',
  templateUrl: './session-cone.component.html',
  styleUrls: ['./session-cone.component.css']
})
export class SessionConeComponent {
    @Input()
    id: number;

    @Input()
    triggered: boolean;

    getColor(): string {
        if (this.triggered) {
            return 'lightgreen';
        } else {
            return 'white';
        }
    }
}
