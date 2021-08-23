/// Helper/utility to create and register GATT advertisements with BlueZ

/// Bluez Doc: https://git.kernel.org/pub/scm/bluetooth/bluez.git/tree/doc/advertising-api.txt

import * as dbus from "dbus-next";

let { Interface, ACCESS_READ, ACCESS_WRITE, ACCESS_READWRITE } = dbus.interface;

type AdType = "peripheral" | "broadcast";

export class GattAdvertisement extends Interface {
    constructor(
        localName: String,
        serviceUUIDs: Array<String>,
        appearance: number,
        private readonly objectPath: string,
        duration: number = 2,
        timeout: number = 300,
    ) {
        super("org.bluez.LEAdvertisement1");

        // NOTE: We are not emitting properties changed, as we have an invariant here that
        // we are not registered, or even known, to other parties at this point
        // If that somehow changes, be sure to emit properties changed signals for each modified property
        this.LocalName = localName;
        this.ServiceUUIDs = serviceUUIDs;
        this.Appearance = appearance;
        this.Duration = duration;
        this.Timeout = timeout;
    }

    Release() {
        console.log("GATT Ad release");
    }

    GetObjectPath() {
        return this.objectPath;
    }

    async Register(bus: dbus.MessageBus) {
        bus.export(this.objectPath, this);
        let hci = await bus.getProxyObject("org.bluez", "/org/bluez/hci0");

        let adManager = hci.getInterface("org.bluez.LEAdvertisingManager1");
        let result = await adManager.RegisterAdvertisement(this.GetObjectPath(), {});
        console.log(`Advertisment register result: ${result}`);
    }

    Type: AdType = "peripheral";
    ServiceUUIDs: String[] = [];
    ManufacturerData: Object = {};
    SolicitUUIDs: String[] = [];
    ServiceData: Object = {};
    Includes: String[] = [];
    LocalName: String = "SET ME!";
    Appearance: number = 0;
    // default 2 seconds
    Duration: number = 2;
    // Lifetime of the advertisement. units are in seconds
    // default to 5 minutes
    Timeout: number = 60 * 5;
}

GattAdvertisement.configureMembers({
    properties: {
        Type: {
            signature: "s",
            access: ACCESS_READ,
        },
        ServiceUUIDs: {
            signature: "as",
            access: ACCESS_READ,
        },
        ManufacturerData: {
            signature: "a{sv}",
            access: ACCESS_READ,
        },
        SolicitUUIDs: {
            signature: "as",
            access: ACCESS_READ,
        },
        ServiceData: {
            signature: "a{sv}",
            access: ACCESS_READ,
        },
        Includes: {
            signature: "as",
            access: ACCESS_READ,
        },
        LocalName: {
            signature: "s",
            access: ACCESS_READ,
        },
        Appearance: {
            signature: "q",
            access: ACCESS_READ,
        },
        Duration: {
            signature: "q",
            access: ACCESS_READ,
        },
        Timeout: {
            signature: "q",
            access: ACCESS_READ,
        },
    },
    methods: {
        Release: {},
    },
});
