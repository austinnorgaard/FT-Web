import { SocketMessageBroker } from "./socket-message-broker";
import { IsNumber, IsString } from "class-validator";

export class TestDto {
    @IsNumber() id: number;
    @IsString() name: string;
}

describe("SocketMessageBroker", () => {
    it("should pass (simple)", () => {
        const broker = new SocketMessageBroker(null);
        const observable = broker.RegisterEventObservable("testEvent", TestDto);

        // make the plain object (i.e. over the wire)
        const plain = {
            id: 10,
            name: "keaton",
        };

        observable.subscribe(data => {});

        const mapping = broker.mappings.find(m => m.eventName === "testEvent");

        expect(() => {
            broker.TransformValidateEmitFlow(mapping, plain);
        }).not.toThrow();

        broker.TransformValidateEmitFlow(mapping, plain);

        // above throws if fails
        expect(true).toBeTruthy();
    });

    it("should fail (simple)", async () => {
        const broker = new SocketMessageBroker(null);
        const observable = broker.RegisterEventObservable("testEvent", TestDto);

        // make the plain object (i.e. over the wire)
        const plain = {
            id: 10,
            name: 10,
        };

        observable.subscribe(data => {});

        const mapping = broker.mappings.find(m => m.eventName === "testEvent");
        try {
            await broker.TransformValidateEmitFlow(mapping, plain);

            // we don't want this!
            expect(true).not.toBeTruthy();
        } catch (err) {
            // good we want this
            expect(true).toBeTruthy();
            return;
        }
    });
});
