"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_levels_1 = require("./log-levels");
class LogDto {
    constructor(message, level, timeStamp, source) {
        this.message = message;
        this.level = level;
        this.timeStamp = timeStamp;
        this.source = source;
    }
    toString() {
        return `[${this.source} @ ${this.timeStamp
            .toISOString()
            .replace("T", " ")
            .replace("Z", "")}] [${log_levels_1.LogLevel[this.level]}] - ${this.message}`;
    }
}
exports.LogDto = LogDto;
//# sourceMappingURL=log.dto.js.map