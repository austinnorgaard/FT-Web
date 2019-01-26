import "reflect-metadata";

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
bootstrap();

/*
import { validate } from "class-validator";

import { plainToClass, plainToClassFromExist } from "class-transformer";
import { MessageFormatTy, PairTy } from "./blah";

const subjects: Subject<any>[] = [];

const mappings: PairTy<any>[] = [];

function test<T>(event: string, testType: { new (): T }): Observable<T> {
    // create the subject..
    const newIndex = subjects.push(new Subject<any>()) - 1;
    mappings.push({ type: new testType(), id: newIndex, name: event } as PairTy<T>);

    return subjects[newIndex].asObservable();
}

async function Blah() {
    const myObservable = test<MessageFormatTy>("test", MessageFormatTy);

    myObservable.subscribe(message => {
        console.log(message);
    });

    // now, emulate sending the message (triggering the internal observable)

    // we've received an event over the socket with name 'test'
    // look up the Type for 'test', make sure we can transform the data into the class
    // then validate the data, then we can emit the data
    const receivedData = {
        name: "test",
        id: 10,
        date: new Date(),
    };

    const ty = mappings.find(t => t.name === "test");

    // class transform

    const transformedClass = plainToClassFromExist(ty.type, receivedData);
    console.log("Transformed: ", transformedClass);
    // validate
    const errors = await validate(transformedClass);
    console.log(`Number of errors: ${errors.length}`);
    if (errors.length === 0) {
        console.log("No errors!");

        // emit
        subjects[0].next(transformedClass);
    } else {
        console.log("Throw here!");
        console.log(`${JSON.stringify(errors)}`);
    }
}

Blah();
*/
