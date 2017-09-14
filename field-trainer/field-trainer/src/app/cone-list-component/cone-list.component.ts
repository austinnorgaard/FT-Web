import { Component, OnInit } from '@angular/core';
import { Cone } from '../data/cone';

import { ConesService } from '../api/cones.service'

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

    constructor(
        private conesService: ConesService
    ) {}

    getCones(): void {
        this.conesService.getCones().then(cones =>
            this.cones = cones);
    }
}
