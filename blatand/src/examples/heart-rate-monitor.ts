import * as dbus from "dbus-next";
let { Interface, ACCESS_READ, ACCESS_WRITE, ACCESS_READWRITE } = dbus.interface;
import { FTAgent } from "../lib/agent";
import { GattApplication } from "../lib/application";
import { BluetoothAdapter } from "../lib/bluetooth-adapter";
import { GattCharacteristic } from "../lib/characteristic";
import { GattDescriptor } from "../lib/descriptor";
import { GattAdvertisement } from "../lib/gatt-advertisement";
import { GattService } from "../lib/service";
import { ReadFlags, WriteFlags } from "../lib/shared";

let bus = dbus.systemBus();

let agent = new FTAgent("/fieldtrainer/agent", bus);
let advertisment = new GattAdvertisement("FieldTrainer", ["0x180D"], 832, "/fieldtrainer/ad");
let adapter = new BluetoothAdapter(bus);

class ClientCharacteristicConfigurationDescriptor extends GattDescriptor {
    constructor(characteristicPath: string) {
        super("2902", characteristicPath, ["read", "write"]);
        this.value = Buffer.from([0, 1]);
    }

    private value: Buffer;

    async WriteValue(bytes: Buffer, flags: WriteFlags): Promise<void> {
        console.log("Desc: Write Value called with bytes: ", bytes, " and flags: ", flags);
        this.value = bytes;
    }
    async ReadValue(flags: ReadFlags): Promise<Buffer> {
        console.log("Desc: ReadValue called with flags: ", flags);
        return this.value;
    }
}

class HeartRateMeasurementCharacteristic extends GattCharacteristic {
    private notifying: boolean = false;
    constructor(servicePath: string) {
        //super("2A37", servicePath, ["read", "write", "notify"], [new ClientCharacteristicConfigurationDescriptor(`${servicePath}/2A37`)]);
        super("2A37", servicePath, ["read", "write", "notify"], []);
        this.Value = Buffer.from([0x6, 0x42]);
    }

    async ReadValue(flags: ReadFlags): Promise<Buffer> {
        console.log("Char: Read value with offset: ", flags.offset ?? 0);
        return this.Value;
    }
    async WriteValue(bytes: Buffer, flags: WriteFlags): Promise<void> {
        console.log(`Char: Write value with\n\tbytes: ${bytes.toString("hex")}\n\toffset: ${flags.offset ?? 0}`);
    }
    StartNotify(): void {
        console.log("Char: Start notify");
        if (this.notifying) {
            console.log("Already notifying");
            return;
        }

        this.notifying = true;

        setTimeout(() => {
            this.NotifyTick();
        }, 1000);
    }
    StopNotify(): void {
        console.log("Char: Stop notify");
        this.notifying = false;
    }

    NotifyTick(): void {
        console.log("Notify ticking");
        if (!this.notifying) {
            console.log("We are not notifying anymore, so skipping this tick and not requeuing");
            return;
        }

        this.Value = Buffer.from([this.Value[0], this.Value[1] + 1]);

        setTimeout(() => {
            this.NotifyTick();
        }, 1000);
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

class HeartRateControlPointCharacteristic extends GattCharacteristic {
    constructor(servicePath: string) {
        super("2A38", servicePath, ["read"], []);
    }
    async ReadValue(flags: ReadFlags): Promise<Buffer> {
        console.log("HRCP Read");
        return Buffer.from([0x1, 0x14, 0x00, 0x50, 0x2a]);
    }
    async WriteValue(bytes: Buffer, flags: WriteFlags): Promise<void> {
        console.log(`HRCP Write with values: ${bytes}`);
    }
    StartNotify(): void {
        console.log("HRCP StartNotify");
    }
    StopNotify(): void {
        console.log("HRCP Stop Notify");
    }
}

class HeartRateService extends GattService {
    constructor(applicationPath: string) {
        super("180D", true, applicationPath, [
            new HeartRateMeasurementCharacteristic(`${applicationPath}/180D`),
            new BodySensorLocationCharacteristic(`${applicationPath}/180D`),
            new HeartRateControlPointCharacteristic(`${applicationPath}/180D`),
        ]);
    }
}

let application = new GattApplication("/fieldtrainer/testApplication", [new HeartRateService("/fieldtrainer/testApplication")]);

async function main() {
    await bus.requestName("com.fieldtrainer", 0);
    await adapter.Initialize();
    await adapter.SetPowered(true);
    await adapter.SetDiscoverable(true);
    await adapter.SetPairable(true);
    await application.RegisterApplication(bus);
    await advertisment.Register(bus);
    await agent.Register();
    await agent.Unregister();
    console.log("Agent registered");
}

process.on("SIGTERM", () => {
    console.log("SIGTERM received.");
    clean();
});

process.on("SIGINT", () => {
    console.log("SIGINT received.");
    clean();
});

async function clean() {
    await advertisment.Unregister(bus);
    await agent.Unregister();
    await application.UnregisterApplication(bus);

    process.exit(0);
}

main().catch((err) => {
    console.log(`Error: ${err}`);
});
