import { Component, OnInit } from '@angular/core';
import { Cone } from '../cone';
@Component({
  selector: 'cone-list',
  templateUrl: './cone-list.component.html',
  styleUrls: ['./cone-list.component.css']
})

export class ConeListComponent implements OnInit {
    ngOnInit(): void {
        this.getCones();
    }
    cones: Cone[];

    getCones(): void {
        this.cones = [
            new Cone('Cone 1', '192.168.1.1'),
            new Cone('Cone 2', '192.168.1.2'),
            new Cone('Cone 3', '192.168.1.3'),
            new Cone('Cone 4', '192.168.1.4'),
            new Cone('Cone 4', '192.168.1.4'),
            new Cone('Cone 4', '192.168.1.4'),
            new Cone('Cone 4', '192.168.1.4'),
            new Cone('Cone 4', '192.168.1.4'),
            new Cone('Cone 4', '192.168.1.4'),
            
        ]
    }
}
