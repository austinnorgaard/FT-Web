import * as dbus from "dbus-next";
import { FTAgent, registerAgent, setDefaultAgent } from "./agent";
import { BluetoothAdapter } from "./bluetooth-adapter";
import { GattCharacteristic } from "./characteristic";
import { GattDescriptor } from "./descriptor";
import { GattAdvertisement } from "./gatt-advertisement";
import { GattService } from "./service";
import { ReadFlags, WriteFlags } from "./shared";

let bus = dbus.systemBus();

let agent = new FTAgent("org.bluez.Agent1");
let advertisment = new GattAdvertisement("TestAd", ["0x180F"], 832);
let adapter = new BluetoothAdapter(bus);

class MyDescriptor extends GattDescriptor {
    constructor(dbusPath: string) {
        super("180F", dbusPath, ["read", "write"]);
    }

    async WriteValue(bytes: Buffer, flags: Object): Promise<void> {
        console.log("Write Value called with bytes: ", bytes, " and flags: ", flags);
    }
    async ReadValue(flags: Object): Promise<Buffer> {
        console.log("ReadValue called with flags: ", flags);
        return Buffer.from([0xd, 0xe, 0xa, 0xd]);
    }
}

class MyCharacteristic extends GattCharacteristic {
    constructor(dbusPath: string) {
        super("1234", dbusPath, ["read", "write"]);
    }

    async ReadValue(flags: ReadFlags): Promise<Buffer> {
        console.log("Read value with offset: ", flags.offset?.value ?? 0);
        return Buffer.from([0x42, 0x42]);
    }
    async WriteValue(bytes: Buffer, flags: WriteFlags): Promise<void> {
        console.log(`Write value with\n\tbytes: ${bytes.toString("hex")}\n\toffset: ${flags.offset?.value ?? 0}`);
    }
    StartNotify(): void {
        console.log("Start notify");
    }
    StopNotify(): void {
        console.log("Stop notify");
    }
}

class MyService extends GattService {
    constructor() {
        super("5678", true);
    }
}

let char = new MyCharacteristic("/fieldtrainer/char1");
let service = new MyService();

async function main() {
    await bus.requestName("com.fieldtrainer", 0);
    await adapter.Initialize();

    await adapter.SetDiscoverable(true);
    await adapter.SetPairable(true);

    bus.export("/fieldtrainer/agent", agent);
    bus.export("/fieldtrainer/ad1", advertisment);
    bus.export("/fieldtrainer/desc1", char);
    bus.export("/fieldtrainer/service", service);
    await registerAgent(agent, bus);
    await setDefaultAgent(agent, bus);
    console.log("Agent registered");
}

main().catch((err) => {
    console.log(`Error: ${err}`);
});
