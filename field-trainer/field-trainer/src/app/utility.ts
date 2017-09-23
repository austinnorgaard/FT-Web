var rp = require('request-promise');

export class HttpUtil {
    static get(path: string) {
        var options = {
            uri: path,
            json: true
        };

        return rp(options);
    }
}