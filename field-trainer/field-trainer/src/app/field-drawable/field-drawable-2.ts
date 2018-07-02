import { ElementRef } from "@angular/core";
import { Field } from "../models/field";
import { Point } from "../models/point";

export class FieldDrawablePixi {
    app: any;
    container: any;
    coneTexture: any;
    private scale: Point = new Point();
    private origin: Point = new Point();
    private field: Field;

    constructor(field: ElementRef) {
        console.log(field);
        this.app = new PIXI.Application({ width: 1, height: 1, view: field.nativeElement });
        this.container = new PIXI.Container();
        this.app.stage.addChild(this.container);
        this.coneTexture = PIXI.Texture.fromImage("./assets/cone.png");
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
        if (parentHeight > parentWidth) {
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
            coneSprite.x = cone.position.x * this.scale.x;
            coneSprite.y = cone.position.y * this.scale.y;
            coneSprite.scale = new PIXI.Point(0.25, 0.25);
            this.container.addChild(coneSprite);
        });
    }

    private getMidPoint(): Point {
        return {
            x: this.app.renderer.width / 2,
            y: this.app.renderer.height / 2,
        };
    }
}
