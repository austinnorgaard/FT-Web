import * as dbus from "dbus-next";
import { FTAgent, registerAgent, setDefaultAgent } from "./agent";
import { BluetoothAdapter } from "./bluetooth-adapter";
import { GattAdvertisement } from "./gatt-advertisement";

let bus = dbus.systemBus();

let agent = new FTAgent("org.bluez.Agent1");
let advertisment = new GattAdvertisement("TestAd", ["0x180F"], 832);
let adapter = new BluetoothAdapter(bus);

async function main() {
    await bus.requestName('com.fieldtrainer', 0);
    await adapter.Initialize();

    await adapter.SetDiscoverable(true);
    await adapter.SetPairable(true);

    bus.export('/fieldtrainer/agent', agent);
    bus.export('/fieldtrainer/ad1', advertisment);
    await registerAgent(agent, bus);
    await setDefaultAgent(agent, bus);
    console.log("Agent registered");
}

main().catch(err => {
    console.log(`Error: ${err}`);
})