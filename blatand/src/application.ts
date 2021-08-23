import { GattService } from "./service";
import * as dbus from "dbus-next";

let { Interface, ACCESS_READ, ACCESS_WRITE, ACCESS_READWRITE } = dbus.interface;

/**
 *
 * Example output from GetManagedObjects
 * {
 *      "/fieldtrainer/application/service1": {
 *          "org.bluez.GattService1": {
 *              "UUID": "180F",
 *              "Primary": true
 *          }
 *      },
 *      "/fieldtrainer/application/service1/characteristic1": {
 *          "org.bluez.GattCharacteristic1": {
 *              "UUID": "180F",
 *              "Service": "/fieldtrainer/application/service1",
 *              "Flags": ["read", "write"]
 *          }
 *      },
 *      "/fieldtrainer/application/service1/characteristic1/descriptor1": {
 *          "org.bluez.GattDescriptor1": {
 *              "UUID": "180F",
 *              "Characteristic": "/fieldtrainer/application/service1/characteristic1",
 *              "Flags": ["write", "read"]
 *          }
 *      }
 * }
 */

export class GattApplication extends Interface {
    private services: GattService[] = [];
    // String representing the hierarchy of the application.
    // Suitable for being the response to the "GetManagedObjects" call
    private objectManagerStructure: any = {};
    // needs to implement the org.freedesktop.DBus.ObjectManager, detailing
    // each of the children objects (and their children, etc..)
    // On the bus, it resides at `/{basePath}/{applicationName}`
    constructor(private readonly applicationPath: string, services: GattService[]) {
        super("org.freedesktop.DBus.ObjectManager");
        this.services = services;
    }

    async RegisterApplication(bus: dbus.MessageBus) {
        // Export the entire applications set of services, characteristics and descriptors
        // on the bus
        bus.export(this.applicationPath, this);
        this.services.forEach((service) => {
            service.Register(bus);
            service.GetCharacteristics().forEach((char) => {
                char.Register(bus);
                char.GetDescriptors().forEach((desc) => {
                    desc.Register(bus);
                });
            });
        });
        this.ParseObjects();

        // Register application with bluez
        let hci = await bus.getProxyObject("org.bluez", "/org/bluez/hci0");

        let gattManager = hci.getInterface("org.bluez.GattManager1");
        let result = await gattManager.RegisterApplication(this.applicationPath, {});
        console.log(`Register application result: ${result}`);
    }

    ParseObjects() {
        let structure: any = {};

        this.services.forEach((service) => {
            structure[service.GetObjectPath()] = service.ToDBusObject();
            service.GetCharacteristics().forEach((char) => {
                structure[char.GetObjectPath()] = char.ToDBusObject();
                char.GetDescriptors().forEach((desc) => {
                    structure[desc.GetObjectPath()] = desc.ToDBusObject();
                });
            });
        });

        this.objectManagerStructure = structure;
    }

    GetManagedObjects() {
        console.log("Get Managed Objects");
        return this.objectManagerStructure;
    }
}

GattApplication.configureMembers({
    methods: {
        GetManagedObjects: {
            inSignature: "",
            outSignature: "a{oa{sa{sv}}}",
        },
    },
});
