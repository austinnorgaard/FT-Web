import * as dbus from "dbus-next";
import { FTAgent, registerAgent, setDefaultAgent } from "./agent";
import { GattApplication } from "./application";
import { BluetoothAdapter } from "./bluetooth-adapter";
import { GattCharacteristic } from "./characteristic";
import { GattDescriptor } from "./descriptor";
import { GattAdvertisement } from "./gatt-advertisement";
import { GattService } from "./service";
import { ReadFlags, WriteFlags } from "./shared";

let bus = dbus.systemBus();

let agent = new FTAgent("org.bluez.Agent1");
let advertisment = new GattAdvertisement("TestAd", ["0x180D"], 832, "/fieldtrainer/ad");
let adapter = new BluetoothAdapter(bus);

class ClientCharacteristicConfigurationDescriptor extends GattDescriptor {
    constructor(characteristicPath: string) {
        super("2902", characteristicPath, ["read", "write"]);
    }

    async WriteValue(bytes: Buffer, flags: Object): Promise<void> {
        console.log("Desc: Write Value called with bytes: ", bytes, " and flags: ", flags);
    }
    async ReadValue(flags: Object): Promise<Buffer> {
        console.log("Desc: ReadValue called with flags: ", flags);
        return Buffer.from([0x1]);
    }
}

class HeartRateMeasurementCharacteristic extends GattCharacteristic {
    constructor(servicePath: string) {
        super("2A37", servicePath, ["read", "write"], [new ClientCharacteristicConfigurationDescriptor(`${servicePath}/2A37`)]);
    }

    async ReadValue(flags: ReadFlags): Promise<Buffer> {
        console.log("Char: Read value with offset: ", flags.offset ?? 0);
        return Buffer.from([0x42, 0x42]);
    }
    async WriteValue(bytes: Buffer, flags: WriteFlags): Promise<void> {
        console.log(`Char: Write value with\n\tbytes: ${bytes.toString("hex")}\n\toffset: ${flags.offset ?? 0}`);
    }
    StartNotify(): void {
        console.log("Char: Start notify");
    }
    StopNotify(): void {
        console.log("Char: Stop notify");
    }
}

class BodySensorLocationCharacteristic extends GattCharacteristic {
    constructor(servicePath: string) {
        super("2A39", servicePath, ["read", "write"], []);
    }

    async ReadValue(flags: ReadFlags): Promise<Buffer> {
        console.log("Body Sensor read value");
        return Buffer.from([0x1]);
    }

    async WriteValue(bytes: Buffer, flags: WriteFlags): Promise<void> {
        console.log("Body sensor write value with bytes: ", bytes);
    }

    StartNotify(): void {
        console.log("Body sensor start notify");
    }
    StopNotify(): void {
        console.log("Body sensor stop notify");
    }
}

class HeartRateService extends GattService {
    constructor(applicationPath: string) {
        super("180D", true, applicationPath, [
            new HeartRateMeasurementCharacteristic(`${applicationPath}/180D`),
            new BodySensorLocationCharacteristic(`${applicationPath}/180D`),
        ]);
    }
}

let application = new GattApplication("/fieldtrainer/testApplication", [new HeartRateService("/fieldtrainer/testApplication")]);

//let char = new MyCharacteristic("/fieldtrainer/char1");
//let service = new MyService();

async function main() {
    await bus.requestName("com.fieldtrainer", 0);
    await adapter.Initialize();

    await adapter.SetDiscoverable(true);
    await adapter.SetPairable(true);
    await application.RegisterApplication(bus);
    await advertisment.Register(bus);
    bus.export("/fieldtrainer/agent", agent);
    await registerAgent(agent, bus);
    await setDefaultAgent(agent, bus);
    console.log("Agent registered");
}

main().catch((err) => {
    console.log(`Error: ${err}`);
});
