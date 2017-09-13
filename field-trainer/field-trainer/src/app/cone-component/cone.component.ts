import { Component, Input } from '@angular/core';

@Component({
  selector: 'cone',
  templateUrl: './cone.component.html',
  styleUrls: ['./cone.component.css']
})
export class ConeComponent {
    @Input()
    name: string = "Cone 1";
    @Input()
    ip_address: string = "192.168.255.255";
}
