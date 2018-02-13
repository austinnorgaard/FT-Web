const rp = require('request-promise');

export class HttpUtil {
    static get(path: string) {
        const options = {
            uri: path,
            json: true
        };

        return rp(options);
    }
}

export function clone(obj) {
    if (obj == null || typeof(obj) !== 'object') {
        return obj;
    }

    const temp = new obj.constructor();
    for (const key of Object.keys(obj)) {
        temp[key] = clone(obj[key]);
    }

    return temp;
}

export function getCurrentTime() {
    return Date.now();
}
