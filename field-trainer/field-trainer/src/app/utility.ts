var rp = require('request-promise');

export const startConeIp: string = "192.168.1.11:3000";

export class HttpUtil {
    static get(path: string) {
        var options = {
            uri: path,
            json: true
        };

        return rp(options);
    }
}