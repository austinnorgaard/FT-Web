import DBus from "dbus";
import { DBusServiceObject, DBusService, Opt, DBusType, Define } from "dbus";
import { DBusInterface } from "./dbus-interface";

/**
 * Represents an on-bus object and contains a set
 * of interfaces which represent services available on this
 * object
 */
export class DBusObject {
    private readonly objectPath;
    private readonly object: DBusServiceObject;

    private interfaces: Array<DBusInterface> = []; 
    constructor(objectPath: string, service: DBusService) {
        this.objectPath = objectPath;
        this.object = service.createObject(this.objectPath);
    }

    createInterface(path: string) {
        // TODO: Ensure the `path` is unique as it's used for lookups later
        this.interfaces.push(new DBusInterface(path, this));
    }

    getServiceObject() {
        return this.object;
    }

    createMethod(interfaceName: string, methodName: string, handler: (...args: any[]) => void, inParams?: DBusType[], outParam?: DBusType) {
        const dbusInterface = this.interfaces.find(val => 
            val.interfacePath === interfaceName
        );

        if (dbusInterface === undefined) {
            throw new Error(`Could not find interface with name: ${interfaceName} when creating method: ${methodName}`);
        }

        const _inParams = inParams?.map((val) => {
            return Define(val);
        });

        const _outParam = outParam? Define(outParam) : null;

        if (dbusInterface) {
            dbusInterface.getInterface().addMethod(methodName, {
                in: _inParams,
                out: _outParam
            }, handler);
            dbusInterface.getInterface().update();
        }
    }
}