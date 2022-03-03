import { Component, OnInit } from "@angular/core";

@Component({
    selector: "ft-home-page",
    templateUrl: "./home-page.component.html",
    styleUrls: ["./home-page.component.css"],
})
export class HomePageComponent implements OnInit {
    constructor() {}

    async ngOnInit() {
    }

    getUrl()
    {
        return "url('https://storage.cloud.google.com/field-cone/facilities_Stadium_aerial_lighted_DJI_0215_edited.jpg')";
    }
}
