import * as fs from "fs";
import * as util from "util";
import { environment } from "../../../field-trainer/field-trainer/src/environments/environment";
import { coneEnvironment } from "./cone-environment";
import { IsTargetSystem } from "./is-target-system";

const readFile = util.promisify(fs.readFile);

export async function getFieldConeId(): Promise<number> {
    // The field-cone ID is stored at /var/tmp/.cone-id if the device has been bootstrapped
    // otherwise, we can just return -1 as an obvious indicator of an invalid ID
    try {
        if (IsTargetSystem()) {
            const data = await readFile("/var/tmp/.cone-id");
            return parseInt(data.toString("ascii"), 10);
        }
        else {
            return coneEnvironment.config.coneId;
        }
    } catch (err) {
        return -1;
    }
}

export async function getFieldConePort(): Promise<number> {
    // The field-cone port is stored in field-trainer environment, so scanning for that here
    // otherwise, we can just return 0 as an obvious indicator of an invalid port
    try {
        const port = await (parseInt(environment.config.coneApiHttpPort, 10) + await getFieldConeId());
        return port;
    } catch (err) {
        return 0;
    }
}

// easy to modify the IP for testing.. later standardize on the staticly assigned choice for the ad-hoc network
// export const smartConeSocketUrl: string = "http://192.168.2.1:6000";
export function smartConeSocketUrl(): string {
    const port = coneEnvironment.config.FieldConeSocketURL;
    const ip = environment.config.startConeIp;
    // if env var is set, use that, otherwise default to keaton's typical settings
    if (environment.config.backendHost != "http://localhost") {
        console.log(`Field Cone Socket URL env var was set, returning: ${ip}`);
        return 'http://' + ip + ':' + port;
    } else {
        console.log(`Field Cone Socket URL was not set. Defaulting to: http://127.0.0.1:6000`);
        return "http://127.0.0.1:6000";
    }
}
