import { SocketMessageBroker } from "./socket-message-broker";
import { IsNumber, IsString, IsArray, ValidateNested } from "class-validator";
import { PassThrough } from "stream";
import { plainToClass, Type } from "class-transformer";
import { validate } from "class-validator";

export class TestDto {
    @IsNumber() id: number;
    @IsString() name: string;

    testFunction() {
        console.log("this works!");
    }
}

export class ArrayDto {
    @Type(() => TestDto)
    @IsArray({
        each: true,
    })
    items: Array<TestDto>;
}

describe("SocketMessageBroker", () => {
    fit("Top-level Array - Negative (wrong type)", async done => {
        const broker = new SocketMessageBroker(null);
        const observable = broker.RegisterEventObservable("testEvent", ArrayDto);

        // In this case, lets screw up the type internally
        const plain = {
            items: [
                {
                    id: 10,
                    name: 10,
                },
                {
                    id: 11,
                    name: "test2",
                },
            ],
        };

        observable.subscribe((data: ArrayDto) => {
            // shouldn't have gotten here
            fail("The broker should've rejected!");
            done();
        });

        setTimeout(() => {
            fail("Timed out, should have gotten response");
            done();
        }, 2000);

        const mapping = broker.mappings.find(m => m.eventName === "testEvent");
        try {
            await broker.TransformValidateEmitFlow(mapping, plain);

            // no good! should've thrown
            fail("Broker should have thrown!");
            done();
        } catch (err) {
            // expected
            expect(true).toBeTruthy();
            done();
        }
    });
    it("blah", async done => {
        const plain = [
            {
                id: 10,
                name: 12,
            },
            {
                id: 11,
                name: "test2",
            },
        ];

        const test = plainToClass(ArrayDto, plain);
        console.log(`BLAH: ${JSON.stringify(test)}`);
        validate(test).then(errs => {
            console.log(errs);
            console.log(errs.length);

            done();
        });

        expect(true).toBeTruthy();
    });

    it("Basic - Positive", async done => {
        const broker = new SocketMessageBroker(null);
        const observable = broker.RegisterEventObservable("testEvent", TestDto);

        // make the plain object (i.e. over the wire)
        const plain = {
            id: 10,
            name: "keaton",
        };

        observable.subscribe((data: TestDto) => {
            data.testFunction();
            done();
        });

        const mapping = broker.mappings.find(m => m.eventName === "testEvent");

        expect(() => {
            broker.TransformValidateEmitFlow(mapping, plain);
        }).not.toThrow();

        await broker.TransformValidateEmitFlow(mapping, plain);

        // above throws if fails
        expect(true).toBeTruthy();
    });

    it("Basic - Negative", async () => {
        const broker = new SocketMessageBroker(null);
        const observable = broker.RegisterEventObservable("testEvent", TestDto);

        // make the plain object (i.e. over the wire)
        const plain = {
            id: 10,
            name: 10,
        };

        observable.subscribe(data => {
            // this should never be hit, if it is, fail out
        });

        const mapping = broker.mappings.find(m => m.eventName === "testEvent");
        try {
            await broker.TransformValidateEmitFlow(mapping, plain);

            // we don't want this!
            fail("The broker didnt throw an exception!");
        } catch (err) {
            // good we want this
            expect(true).toBeTruthy();
            return;
        }
    });

    it("Top-level Array - Positive", async done => {
        const broker = new SocketMessageBroker(null);
        const observable = broker.RegisterEventObservable("testEvent", ArrayDto);

        const plain = [
            {
                id: 10,
                name: "test",
            },
            {
                id: 11,
                name: "test2",
            },
        ];

        observable.subscribe((data: ArrayDto) => {
            // good
            expect(true).toBeTruthy();
            done();
        });

        setTimeout(() => {
            fail("Timed out, should have gotten response");
            done();
        }, 2000);

        const mapping = broker.mappings.find(m => m.eventName === "testEvent");
        try {
            await broker.TransformValidateEmitFlow(mapping, plain);
        } catch (err) {
            console.log("error");
        }
    });
});
