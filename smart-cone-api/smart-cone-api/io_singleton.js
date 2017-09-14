let instance = null;

class IOSingleton {
    constructor() {
        if (!instance) {
            instance = this;
        }

        this.io = null;

        return instance;
    }

    setIo(i) {
        this.io = i;
    }

    getIo() {
        return this.io;
    }
}

module.exports.IOSingleton = IOSingleton;