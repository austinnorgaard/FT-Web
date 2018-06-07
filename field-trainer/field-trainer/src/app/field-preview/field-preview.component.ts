import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";

@Component({
    selector: "ft-field-preview",
    templateUrl: "./field-preview.component.html",
    styleUrls: ["./field-preview.component.css"],
})
export class FieldPreviewComponent implements OnInit {
    @ViewChild("fieldPreviewCanvas") canvasRef: ElementRef;
    private ctx: CanvasRenderingContext2D = null;
    constructor() {}

    ngOnInit() {
        this.fitToContainer();
        this.ctx = this.canvasRef.nativeElement.getContext("2d");
        this.ctx.fillStyle = "darkgreen";
        this.ctx.fillRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
        let xOrigin = this.getMidPoint().x;
        let yOrigin = this.canvasRef.nativeElement.height;

        // Assume a height of 100 yards (football field)
        // and width of 53 yards
        // All points are scaled according to these field dimensions
        // A location at 0, 0 would be the bottom-left (sideline, endzone)
        // a location at (25, 50) would be roughly middle of the field
        let widthScalar = this.canvasRef.nativeElement.width / 53;
        let heightScaler = this.canvasRef.nativeElement.height / 100;

        console.log(this.canvasRef.nativeElement.width);
        console.log(this.canvasRef.nativeElement.height);
        console.log(widthScalar);
        console.log(heightScaler);

        let positions: Point[] = [
            {
                x: 25 * widthScalar,
                y: yOrigin - 10 * heightScaler,
            },
            {
                // 10 yards north
                x: 25 * widthScalar,
                y: yOrigin - 20 * heightScaler,
            },
            {
                // 8 yards east
                x: 33 * widthScalar,
                y: yOrigin - 20 * heightScaler,
            },
            {
                // 15 yards north
                x: 33 * widthScalar,
                y: yOrigin - 100 * heightScaler,
            },
        ];

        positions.forEach(pos => {
            this.drawConeAtPoint(pos);
        });
    }

    drawConeAtPoint(location: Point) {
        this.ctx.fillStyle = "red";
        let newPosition = location;
        console.log(`drawing at: (${location.x}, ${location.y})`);
        this.ctx.fillRect(location.x, location.y, 10.0, 10.0);
    }

    fitToContainer() {
        this.canvasRef.nativeElement.style.width = "100%";
        this.canvasRef.nativeElement.style.height = "100%";
        this.canvasRef.nativeElement.width = this.canvasRef.nativeElement.offsetWidth;
        this.canvasRef.nativeElement.height = this.canvasRef.nativeElement.offsetHeight;
    }

    getMidPoint(): Point {
        return {
            x: this.canvasRef.nativeElement.width / 2,
            y: this.canvasRef.nativeElement.height / 2,
        };
    }

    fieldResize() {
        this.fitToContainer();
    }
}

export class Point {
    x: number;
    y: number;
}
