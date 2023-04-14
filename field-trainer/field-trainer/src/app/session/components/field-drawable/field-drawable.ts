import { ElementRef } from "@angular/core";
import { Field } from "../../models/field";
import { Point } from "../../models/point";
import { Course } from "../../models/course";

import * as PIXI from "pixi.js";

export class FieldDrawable {
    app: PIXI.Application;
    coneContainer: PIXI.Container;
    textContainer: PIXI.Container;
    coneTexture: PIXI.Texture;
    smartConeTexture: PIXI.Texture;

    private scale: Point = new Point();
    private origin: Point = new Point();
    private field: Field;

    constructor(canvas: ElementRef) {
        this.app = new PIXI.Application({ width: 0, height: 0, view: canvas.nativeElement });
        this.coneContainer = new PIXI.Container();
        this.textContainer = new PIXI.Container();
        this.app.stage.addChild(this.coneContainer);
        this.app.stage.addChild(this.textContainer);
        this.coneTexture = PIXI.Texture.from("./assets/cone.png");
        this.smartConeTexture = PIXI.Texture.from("./assets/smart-cone.png");
        this.app.renderer.backgroundColor = 0xFFFFFF;
    }

    public resize(width: number, height: number) {
        this.app.renderer.resize(width, height);
        this.origin.x = this.getMidPoint().x;
        this.origin.y = this.app.renderer.height;
    }

    public clearField() {
        this.coneContainer.removeChildren();
        this.textContainer.removeChildren();
    }

    public getScaledDimensions(field: Field, width: number, height: number): Point {
        let scaledWidth = 0;
        let scaledHeight = 0;

        // Check our field's width/height to determine the aspect ratio to adhere to
        if (field.height > field.width) {
            const ratio = field.width / field.height;
            scaledWidth = height * ratio;
            scaledHeight = height;
        } else {
            const ratio = field.height / field.width;
            scaledHeight = width * ratio;
            scaledWidth = width;
        }

        return new Point(scaledWidth, scaledHeight);
    }

    public loadField(field: Field, parentWidth: number, parentHeight: number) {
        this.clearField();
        const dimensions = this.getScaledDimensions(field, parentWidth, parentHeight);

        this.app.renderer.backgroundColor = 0x228b22;

        this.app.renderer.resize(dimensions.x, dimensions.y);

        this.scale.x = dimensions.x / field.width;
        this.scale.y = dimensions.y / field.height;

        // first cone is special
        const smartConeSprite = new PIXI.Sprite(this.smartConeTexture);
        smartConeSprite.scale = new PIXI.Point(0.4, 0.4);
        smartConeSprite.x = field.cones[0].position.x * this.scale.x;
        smartConeSprite.y = field.cones[0].position.y * this.scale.y;

        this.coneContainer.addChild(smartConeSprite);

        field.cones.slice(1).forEach(cone => {
            const coneSprite = new PIXI.Sprite(this.coneTexture);
            coneSprite.scale = new PIXI.Point(0.4, 0.4); // TODO find decent solution to make the cones more visible
            coneSprite.x = cone.position.x * this.scale.x;
            coneSprite.y = cone.position.y * this.scale.y;

            this.coneContainer.addChild(coneSprite);
        });
    }

    public loadCourse(course: Course) {
        for (let i = 0; i < course.segmentCollection[0].segments.length; ++i) {
            // each segment we draw text..
            const text = new PIXI.Text(course.segmentCollection[0].segments[i].action, {
                fontFamily: "Arial",
                fontSize: 12,
                fill: 0x000000,
                align: "center",
            });
            const cone1 = course.field.cones[course.segmentCollection[0].segments[i].from];
            const cone2 = course.field.cones[course.segmentCollection[0].segments[i].to];
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
