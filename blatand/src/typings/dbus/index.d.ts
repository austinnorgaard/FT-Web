declare namespace DBus {
    type BusType = "session" | "system";
    interface DBusConnection {

    }

    interface AddMethodOpts {
        in?: Opt[],
        out?: Opt?
    }

    interface Opt {
        type: string,
        name: string,
    }

    type DBusType = StringConstructor | NumberConstructor | ObjectConstructor;

    function Define(type: DBusType, name?: string): Opt;

    interface DBusServiceInterface {
        object: DBusServiceObject;
        name: string;
        addMethod(method: string, opts: AddMethodOpts, handler: (arg1?: any, arg2?: any, arg3?: any, callback: (err: Error?, result: any) => void) => void): DBusServiceInterface;
        update(): void;
    }

    interface DBusServiceObject {
        service: DBusService;
        path: String;
        createInterface(interfaceName: string): DBusServiceInterface;
        updateIntrospection(): void;
        buildChildNodes(): string[];
    }

    interface DBusService extends EventEmitter {
        bus: DBusConnection;
        serviceName: string;

        createObject(objectPath: string): DBusServiceObject;
        removeObject(service: DBusServiceObject): void;
        disconnect(): void;
    }
    function registerService(type: BusType, path: string?): DBusService;

    class Error extends Error {
        constructor(name: string, message: string);
        toString(): string;
    }
}
export = DBus;