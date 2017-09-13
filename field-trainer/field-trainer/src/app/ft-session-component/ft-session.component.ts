import { Component } from '@angular/core';

@Component({
  selector: 'ft-session',
  templateUrl: './ft-session.component.html',
  styleUrls: ['./ft-session.component.css']
})
export class FTSessionComponent {
    players_in_queue: string[] = [
        "Keaton",
        "Tom"
    ]
}
