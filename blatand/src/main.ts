import * as dbus from "dbus-next";
import { FTAgent, registerAgent } from "./agent";

let bus = dbus.systemBus();

let agent = new FTAgent("org.bluez.Agent1");

async function main() {
    await bus.requestName('com.fieldtrainer.Agent', 0);

    bus.export('/fieldtrainer/agent', agent);
    await registerAgent(agent);
    console.log("Agent registered");
}

main().catch(err => {
    console.log(`Error: ${err}`);
})