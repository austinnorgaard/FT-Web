export function clone(obj) {
    if (obj == null || typeof obj !== "object") {
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
