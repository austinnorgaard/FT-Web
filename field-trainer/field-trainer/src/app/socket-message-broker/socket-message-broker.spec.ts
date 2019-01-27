import { SocketMessageBroker } from "./socket-message-broker";
import { IsNumber, IsString, IsArray, ValidateNested, Validate } from "class-validator";
import { Type } from "class-transformer";

export class TestDto {
    @IsNumber() id: number;
    @IsString() name: string;

    testFunction() {}
}

export class ArrayDto {
    @Type(() => TestDto)
    @IsArray()
    @ValidateNested()
    items: Array<TestDto>;
}

export class NestedDto {
    @IsNumber() id: number;

    // also has a TestDto here
    @Type(() => TestDto)
    @ValidateNested()
    dto: TestDto;
}

export class NestedDtoWithArray {
    @IsNumber() id: number;

    @Type(() => TestDto)
    @ValidateNested()
    dto: Array<TestDto>;

    constructor() {
        this.dto = [];
    }

    test() {
        console.log("hello");
    }
}

describe("SocketMessageBroker", () => {
    beforeAll(() => {
        console.log("\u001b[2J\u001b[0;0H");
    });
    it("blah", async done => {
        expect(true).toBeTruthy();
        done();
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

        const plain = {
            items: [
                {
                    id: 10,
                    name: "test",
                },
                {
                    id: 11,
                    name: "test2",
                },
            ],
        };

        observable.subscribe((data: ArrayDto) => {
            // good
            console.log(data);
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
            console.log(JSON.stringify(err));
        }
    });

    it("Top-level Array - Negative (wrong type)", async done => {
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
            console.log(data);
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

    it("Nested Object Basic - Positive", async done => {
        const broker = new SocketMessageBroker(null);
        const observable = broker.RegisterEventObservable("testEvent", NestedDto);

        // make the plain object (i.e. over the wire)
        const plain = {
            id: 10,
            dto: {
                id: 20,
                name: "test",
            },
        };

        observable.subscribe((data: NestedDto) => {
            expect(true).toBeTruthy();
            done();
        });

        const mapping = broker.mappings.find(m => m.eventName === "testEvent");

        await broker.TransformValidateEmitFlow(mapping, plain);
    });

    it("Nested Object Basic - Negative", async done => {
        const broker = new SocketMessageBroker(null);
        const observable = broker.RegisterEventObservable("testEvent", NestedDto);

        // make the plain object (i.e. over the wire)
        const plain = {
            id: 10,
            dto: {
                id: "not a number!!",
                name: "test",
            },
        };

        observable.subscribe(data => {
            // this should never be hit, if it is, fail out
            fail("Broker should not have emitted!");
            done();
        });

        const mapping = broker.mappings.find(m => m.eventName === "testEvent");
        try {
            await broker.TransformValidateEmitFlow(mapping, plain);

            // we don't want this!
            fail("The broker didnt throw an exception!");
            done();
        } catch (err) {
            // good we want this
            expect(true).toBeTruthy();
            done();
        }
    });

    it("Nested Object With Array - Positive", async done => {
        const broker = new SocketMessageBroker(null);
        const observable = broker.RegisterEventObservable("testEvent", NestedDtoWithArray);

        // make the plain object (i.e. over the wire)
        const plain = {
            id: 10,
            dto: [
                {
                    id: 20,
                    name: "test",
                },
                {
                    id: 21,
                    name: "test2",
                },
            ],
        };

        observable.subscribe((data: NestedDtoWithArray) => {
            console.log(data);
            expect(data).toEqual(jasmine.any(NestedDtoWithArray));
            done();
        });

        const mapping = broker.mappings.find(m => m.eventName === "testEvent");

        await broker.TransformValidateEmitFlow(mapping, plain);
    });

    it("Nested Object With Array - Negative", async done => {
        const broker = new SocketMessageBroker(null);
        const observable = broker.RegisterEventObservable("testEvent", NestedDtoWithArray);

        // make the plain object (i.e. over the wire)
        const plain = {
            id: 10,
            dto: [
                {
                    id: "WRONG!",
                    name: "test",
                },
                {
                    id: 21,
                    name: "test2",
                },
            ],
        };

        observable.subscribe((data: NestedDtoWithArray) => {
            fail("Broker should not have emitted!");
            done();
        });

        const mapping = broker.mappings.find(m => m.eventName === "testEvent");
        try {
            await broker.TransformValidateEmitFlow(mapping, plain);

            fail("Broker should have thrown!");
            done();
        } catch (err) {
            // expected!
            expect(true).toBeTruthy();
            done();
        }
    });
});
