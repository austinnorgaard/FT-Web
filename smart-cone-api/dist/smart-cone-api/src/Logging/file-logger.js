"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const fs = require("fs");
const util = require("util");
const path = require("path");
const os = require('os');
const writeFile = util.promisify(fs.writeFile);
const openFile = util.promisify(fs.open);
class FileLogger extends common_1.Logger {
    constructor(filePath) {
        super();
        this.filePath = filePath;
        fs.openSync(path.join(os.homedir(), '.ft_logs.txt'), 'w');
        this.filePath = `${os.homedir()}/.ft_logs.txt`;
        FileLogger.writeStream = fs.createWriteStream(this.filePath);
    }
    async log(message) {
        super.log(message);
        await FileLogger.writeToFile(message);
    }
    async error(message, trace) {
        super.error(message, trace);
        await FileLogger.writeToFile(message);
    }
    async warn(message) {
        super.warn(message);
        await FileLogger.writeToFile(message);
    }
    static async writeToFile(message) {
        try {
            if (message instanceof Object) {
                message = JSON.stringify(message);
            }
            const now = new Date()
                .toISOString()
                .replace("T", " ")
                .replace("Z", " :: ");
            FileLogger.writeStream.cork();
            FileLogger.writeStream.write(now + message + "\n");
            FileLogger.writeStream.uncork();
        }
        catch (err) {
            console.log(err);
        }
    }
}
exports.FileLogger = FileLogger;
//# sourceMappingURL=file-logger.js.map