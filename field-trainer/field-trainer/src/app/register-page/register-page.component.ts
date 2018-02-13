import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

    readonly prefixes: string[] = ['Mr', 'Mrs', 'Ms'];

    readonly countries: string[] = ['United States', 'United Kingdom', 'Australia', 'New Zealand', 'Some other country'];

    constructor() { 

    }

    ngOnInit() {
    }

}
