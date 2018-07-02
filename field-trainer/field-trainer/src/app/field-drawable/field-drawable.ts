import { ElementRef } from "@angular/core";
import { Point } from "../models/point";

/*
    A FieldDrawable takes a canvas element and some settings and will
    render the Field.
*/

export class FieldDrawable {
    // These are the values to multiply points against to translate
    // them to the scaled up field
    private scale: Point;
    private origin: Point;
    private context: CanvasRenderingContext2D = null;
    private canvas: ElementRef;
    private backgroundColor = "darkgreen";
    private coneColor = "orange";

    // The width and height should represent real-life values, such as yards
    public constructor(canvas: ElementRef, width: number, height: number) {
        this.fieldResize();
        this.canvas = canvas;
        this.context = canvas.nativeElement.getContext("2d");
        this.scale.x = canvas.nativeElement.width / width;
        this.scale.y = canvas.nativeElement.height / height;
        this.origin.x = this.getMidPoint().x;
        this.origin.y = this.canvas.nativeElement.height;

        this.context.fillStyle = this.backgroundColor;
        this.context.fillRect(0, 0, canvas.nativeElement.width, canvas.nativeElement.height);
    }

    public load(points: Point[]) {
        points.forEach(p => {});
    }

    // Public method to call if the field is resized
    public fieldResize() {
        this.fitToContainer();
    }

    // Draws a cone at the given point
    // For now, we will draw orange squares
    private drawConeAtPoint(location: Point) {
        this.context.fillStyle = this.coneColor;
        this.context.fillRect(location.x, location.y, 1.0 * this.scale.x, 1.0 * this.scale.y);
    }

    // This method will fill the container it is in
    // Will need to be called if resizing occurs
    private fitToContainer() {
        this.canvas.nativeElement.style.width = "100%";
        this.canvas.nativeElement.style.height = "100%";
        this.canvas.nativeElement.width = this.canvas.nativeElement.offsetWidth;
        this.canvas.nativeElement.height = this.canvas.nativeElement.offsetHeight;
    }

    private getMidPoint(): Point {
        return {
            x: this.canvas.nativeElement.width / 2,
            y: this.canvas.nativeElement.height / 2,
        };
    }
}
