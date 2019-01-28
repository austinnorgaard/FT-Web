import { IsNull } from "sequelize-typescript";

/*import "reflect-metadata";

import { NestFactory } from "@nestjs/core";
import { ApplicationModule } from "./App/app.module";
import { ValidationPipe } from "@nestjs/common";
import { environment } from "../../field-trainer/field-trainer/src/environments/environment";
import cors = require("cors");
import { FileLogger } from "./Logging/file-logger";
import { ConstraintsInterceptor } from "./App/constraints.interceptor";

async function bootstrap() {
    const app = await NestFactory.create(ApplicationModule, {
        logger: false,
    });
    app.useLogger(app.get(FileLogger));
    app.use(cors());
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalInterceptors(new ConstraintsInterceptor());
    await app.listen(parseInt(environment.config.smartConeApiHttpPort, 10));
}
// start
bootstrap();*/

export type ClassType<T> = new (...args: any[]) => T;

export abstract class Test {
    public abstract TestFunction<T>(eventName: string, type?: ClassType<T>): void;
    public abstract TestFunction<T>(eventName: string, type: ClassType<T>): void;
}

export class TestImpl extends Test {
    public TestFunction<T = null>(eventName: string, type: ClassType<T>): void;
    public TestFunction<T>(eventName: string, type: ClassType<T>): void {
        if (typeof type === "undefined") {
            console.log("User doesn't care about return value");
        } else {
            console.log("User DOES care about return value!");
        }
    }
}

const object: Test = new TestImpl();

object.TestFunction("blah");
object.TestFunction("blah", Number);
