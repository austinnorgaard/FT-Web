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
        return -1;
    }
}
