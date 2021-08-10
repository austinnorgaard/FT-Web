import DBus, { registerService, Define, DBusServiceInterface } from "dbus";
import { DBusObject } from "./dbus-manager/dbus-object";

var agentService = registerService("system", "com.fieldtrainer.Agent");

let agentManager = new DBusObject("/fieldtrainer/agent", agentService);
agentManager.createInterface("org.bluez.Agent1");

agentManager.createMethod("org.bluez.Agent1", "Release", (callback) => {
    console.log("Release called!");
    callback();
});
agentManager.createMethod("org.bluez.Agent1", "RequestPinCode", (device, callback) => {
    console.log("Agent::RequestPinCode called with device: ", device);
    callback(null, "1234");
}, [Object], String);
agentManager.createMethod("org.bluez.Agent1", "DisplayPinCode", (device, code, callback) => {
    console.log("Agent::DisplayPinCode called with device: ", device, " and code: ", code);
    callback();
}, [Object, String]);


/*agentInterface.addMethod(
    "RequestPinCode",
    {
        in: [Define(Object)],
        out: Define(String),
    },
    (device: any, callback) => {
        console.log(`Agent::RequestPinCode called with device: ${device}`);
        callback(null, "1234");
    },
);

agentInterface.addMethod(
    "DisplayPinCode",
    {
        in: [Define(Object), Define(String)],
    },
    (device: any, pincode: string, callback) => {
        console.log(`Agent::DisplayPinCode called with device: ${device} and pincode: ${pincode}`);
        callback();
    }
)

agentInterface.update();
*/