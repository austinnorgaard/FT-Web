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

export function clone(obj){
    if(obj == null || typeof(obj) != 'object')
        return obj;

    var temp = new obj.constructor(); 
    for(var key in obj)
        temp[key] = clone(obj[key]);

    return temp;
}

export function getCurrentTime() {
    return Date.now();
}