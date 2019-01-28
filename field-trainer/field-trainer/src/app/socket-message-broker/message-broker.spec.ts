import { SocketMessageBroker } from "./socket-message-broker";
import { IsNumber, IsString, IsArray, ValidateNested, Validate } from "class-validator";
import { Type } from "class-transformer";
import { MessageBroker } from "./message-broker";
import { MockMessageBroker } from "./mock-message-broker";

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

let broker: MessageBroker = null;

function setBrokerTestData(eventName: string, payload?: any) {
    (broker as MockMessageBroker).SetEventData(eventName, payload);
}

function triggerBrokerEvent() {
    (broker as MockMessageBroker).TriggerEvent();
}

async function triggerIncomingData() {
    await (broker as MockMessageBroker).TriggerIncomingData();
}

async function someFunction() {
    await someFunc2();
}

async function someFunc2() {
    await someThrowingFunction();
}

async function someThrowingFunction() {
    throw new Error("Error!");
}

describe("SocketMessageBroker", () => {
    beforeAll(() => {
        console.log("\u001b[2J\u001b[0;0H");
    });

    beforeEach(() => {
        broker = new MockMessageBroker();
    });

    it("blah", async done => {
        try {
            await someFunction();
            fail();
            done();
        } catch (err) {
            done();
        }
    });

    it("Basic - Positive", async done => {
        // make the plain object (i.e. over the wire)
        const plain = {
            id: 10,
            name: "keaton",
        };
        setBrokerTestData("testEvent", plain);

        const observable = broker.RegisterEventObservable("testEvent", TestDto);

        observable.subscribe((data: TestDto) => {
            expect(data).toEqual(jasmine.any(TestDto));
            done();
        });

        triggerBrokerEvent();
    });

    it("Basic - Negative", async done => {
        const plain = {
            id: 10,
            name: 10,
        };
        setBrokerTestData("testEvent", plain);

        const obs = broker.RegisterEventObservable("testEvent", TestDto);

        obs.subscribe(data => {
            // this should never be hit, if it is, fail out
            fail("Broker should not have emitted!");
            done();
        });

        try {
            await triggerIncomingData();

            fail("Broker should have rejected this data");
            done();
        } catch (err) {
            expect(true).toBeTruthy();
            done();
        }
    });

    it("Top-level Array - Positive", async done => {
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

        setBrokerTestData("testEvent", plain);

        const observable = broker.RegisterEventObservable("testEvent", ArrayDto);

        observable.subscribe((data: ArrayDto) => {
            // good
            expect(data).toEqual(jasmine.any(ArrayDto));
            done();
        });

        triggerBrokerEvent();
    });

    it("Top-level Array - Negative (wrong type)", async done => {
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
        setBrokerTestData("testEvent", plain);

        const observable = broker.RegisterEventObservable("testEvent", ArrayDto);

        observable.subscribe((data: ArrayDto) => {
            // shouldn't have gotten here
            console.log(data);
            fail("The broker should've rejected!");
            done();
        });

        try {
            await triggerIncomingData();

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
        // make the plain object (i.e. over the wire)
        const plain = {
            id: 10,
            dto: {
                id: 20,
                name: "test",
            },
        };
        setBrokerTestData("testEvent", plain);
        const observable = broker.RegisterEventObservable("testEvent", NestedDto);

        observable.subscribe((data: NestedDto) => {
            expect(data).toEqual(jasmine.any(NestedDto));
            done();
        });

        triggerBrokerEvent();
    });

    it("Nested Object Basic - Negative", async done => {
        // make the plain object (i.e. over the wire)
        const plain = {
            id: 10,
            dto: {
                id: "not a number!!",
                name: "test",
            },
        };
        setBrokerTestData("testEvent", plain);
        const observable = broker.RegisterEventObservable("testEvent", NestedDto);

        observable.subscribe(data => {
            // this should never be hit, if it is, fail out
            fail("Broker should not have emitted!");
            done();
        });

        try {
            await triggerIncomingData();
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
        setBrokerTestData("testEvent", plain);

        const observable = broker.RegisterEventObservable("testEvent", NestedDtoWithArray);

        observable.subscribe((data: NestedDtoWithArray) => {
            data.test(); // wouldn't work if plain wasn't transformed
            expect(data).toEqual(jasmine.any(NestedDtoWithArray));
            done();
        });
        triggerBrokerEvent();
    });

    it("Nested Object With Array - Negative", async done => {
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
        setBrokerTestData("testEvent", plain);
        const observable = broker.RegisterEventObservable("testEvent", NestedDtoWithArray);

        observable.subscribe((data: NestedDtoWithArray) => {
            fail("Broker should not have emitted!");
            done();
        });

        try {
            await triggerIncomingData();

            fail("Broker should have thrown!");
            done();
        } catch (err) {
            // expected!
            expect(true).toBeTruthy();
            done();
        }
    });

    it("Multiple Clients Same Event", async done => {
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
        setBrokerTestData("testEvent", plain);
        // 2 different clients register for the same event. we make sure that both
        // receive the message.
        const observable1 = broker.RegisterEventObservable("testEvent", NestedDtoWithArray);
        const observable2 = broker.RegisterEventObservable("testEvent", NestedDtoWithArray);

        let numCalls = 0;
        observable1.subscribe((data: NestedDtoWithArray) => {
            expect(data).toEqual(jasmine.any(NestedDtoWithArray));
            numCalls++;
            if (numCalls === 2) {
                done();
            }
        });

        observable2.subscribe((data: NestedDtoWithArray) => {
            expect(data).toEqual(jasmine.any(NestedDtoWithArray));
            numCalls++;
            if (numCalls === 2) {
                done();
            }
        });
        triggerBrokerEvent();
    });
});
