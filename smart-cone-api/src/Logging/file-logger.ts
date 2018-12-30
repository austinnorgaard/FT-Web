import { Logger, Component } from "@nestjs/common";

const fs = require("fs");
const util = require("util");

const writeFile = util.promisify(fs.writeFile);

export class FileLogger extends Logger {
    private static writeStream: any;
    public constructor(private filePath: string) {
        super();
        this.filePath = "C:\\temp\\logs.txt";
        FileLogger.writeStream = fs.createWriteStream(this.filePath);
    }

    async log(message: string | object) {
        super.log(message);
        await FileLogger.writeToFile(message);
    }

    async error(message: string | object, trace: string) {
        super.error(message, trace);
        await FileLogger.writeToFile(message);
    }

    async warn(message: string | object) {
        super.warn(message);
        await FileLogger.writeToFile(message);
    }

    public static async writeToFile(message: string | object) {
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
            //            await writeFile(this.filePath, now + message + "\n", { flag: "a" });
        } catch (err) {
            console.log(err);
        }
    }
}
