import { Component, Input } from '@angular/core';

@Component({
  selector: 'session-cone',
  templateUrl: './session-cone.component.html',
  styleUrls: ['./session-cone.component.css']
})
export class SessionConeComponent {
    @Input()
    id: number;
}
