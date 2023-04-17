"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
function IsTargetSystem() {
    try {
        fs.readFileSync("/var/tmp/.cone-type");
        return true;
    }
    catch (err) {
        return false;
    }
}
exports.IsTargetSystem = IsTargetSystem;
//# sourceMappingURL=is-target-system.js.map