import { ElementRef } from "@angular/core";
import { Field } from "../models/field";
import { Point } from "../models/point";
import { Course } from "../models/course";

export class FieldDrawablePixi {
    app: any;
    container: any;
    coneTexture: any;
    textContainer: any;
    private scale: Point = new Point();
    private origin: Point = new Point();
    private field: Field;

    constructor(field: ElementRef) {
        console.log(field);
        this.app = new PIXI.Application({ width: 1, height: 1, view: field.nativeElement });
        this.container = new PIXI.Container();
        this.textContainer = new PIXI.Container();
        this.app.stage.addChild(this.container);
        this.app.stage.addChild(this.textContainer);
        this.coneTexture = PIXI.Texture.fromImage("./assets/cone.png");
        this.app.renderer.backgroundColor = 0x101010;
    }

    public resize(width: number, height: number) {
        this.app.renderer.resize(width, height);
        this.origin.x = this.getMidPoint().x;
        this.origin.y = this.app.renderer.height;
    }

    public loadField(field: Field, parentWidth: number, parentHeight: number) {
        if (this.app.stage.children.length > 0) {
            this.app.stage.removeChild(this.app.stage.children[0]); // only 1 container so far..
        }
        // re-create the container and add it back
        this.container = new PIXI.Container();
        this.app.stage.addChild(this.container);

        // the parent width/height tells us how much room we have to fit into

        let scaledWidth = 0;
        let scaledHeight = 0;

        console.log(`Parent dimensions: ${parentWidth} x ${parentHeight}`);

        // if the width is greater than the height, we'll scale the height down to fit
        // otherwise the other way
        if (field.height > field.width) {
            // Leave the height alone, scale the width by the passed in ratio
            console.log(`Field dimensions; ${field.width} x ${field.height}`);
            const ratio = field.width / field.height;
            console.log(`ratio: ${ratio}`);
            scaledWidth = parentHeight * ratio;
            scaledHeight = parentHeight;
        } else {
            const ratio = field.height / field.width;
            scaledHeight = parentWidth * ratio;
            scaledWidth = parentWidth;
        }

        console.log(`Scaled dimensions; ${scaledWidth} x ${scaledHeight}`);

        this.app.renderer.resize(scaledWidth, scaledHeight);

        this.scale.x = scaledWidth / field.width;
        this.scale.y = scaledHeight / field.height;

        field.cones.forEach(cone => {
            const coneSprite = new PIXI.Sprite(this.coneTexture);
            coneSprite.scale = new PIXI.Point(0.4, 0.4);
            coneSprite.x = cone.position.x * this.scale.x;
            coneSprite.y = cone.position.y * this.scale.y;

            this.container.addChild(coneSprite);
        });
    }

    public loadCourse(course: Course) {
        console.log(`${JSON.stringify(course)}`);
        // Load a course related to this field.
        // Draw text in a separate container over top of the existing container
        // Just draw text between the cones with the action name
        for (let i = 0; i < course.segments.length; ++i) {
            // each segment we draw text..
            const text = new PIXI.Text(course.segments[i].action, { fontFamily: "Arial", fontSize: 10, fill: 0xdddddd, align: "center" });
            const cone1 = course.field.cones[course.segments[i].from];
            const cone2 = course.field.cones[course.segments[i].to];
            const location = new Point((cone1.position.x + cone2.position.x) / 2, (cone1.position.y + cone2.position.y) / 2);
            console.log(`Location: ${location.x} x ${location.y}`);
            text.position = new PIXI.Point(location.x * this.scale.x, location.y * this.scale.y);
            this.textContainer.addChild(text);
        }
    }

    private getMidPoint(): Point {
        return {
            x: this.app.renderer.width / 2,
            y: this.app.renderer.height / 2,
        };
    }
}
