import { Component, OnInit } from "@angular/core";

@Component({
    selector: "ft-home-page",
    templateUrl: "./home-page.component.html",
    styleUrls: ["./home-page.component.css"],
})
export class HomePageComponent implements OnInit {
    constructor() {
    }

    async ngOnInit() {
    }
    

    getVideoSrc() {
        let src = "../../../../assets/video.mp4";
        return src;
    }
}
