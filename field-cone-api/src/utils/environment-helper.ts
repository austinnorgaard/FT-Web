import * as fs from "fs";
import * as util from "util";

const readFile = util.promisify(fs.readFile);

export async function getFieldConeId(): Promise<number> {
    // The field-cone ID is stored at /var/tmp/.cone-id if the device has been bootstrapped
    // otherwise, we can just return -1 as an obvious indicator of an invalid ID
    try {
        const data = await readFile("/var/tmp/.cone-id");
        return parseInt(data.toString("ascii"), 10);
    } catch (err) {
        return 1;
    }
}

// easy to modify the IP for testing.. later standardize on the staticly assigned choice for the ad-hoc network
// export const smartConeSocketUrl: string = "http://192.168.2.1:6000";
export function smartConeSocketUrl(): string {
    // if env var is set, use that, otherwise default to keaton's typical settings
    if (process.env.FIELD_CONE_SOCKET_URL) {
        console.log(`Field Cone Socket URL env var was set, returning: ${process.env.FIELD_CONE_SOCKET_URL}`);
        return process.env.FIELD_CONE_SOCKET_URL;
    } else {
        console.log(`Field Cone Socket URL was not set. Defaulting to: http://127.0.0.1:53333`);
        return "http://127.0.0.1:53333";
    }
}
