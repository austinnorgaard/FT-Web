import * as fs from "fs";

// Returns True if we are on what appears to be a target system,
// which is a system which appears like either a smart-cone or
// a field-cone
// If false, it means we're likely on a dev system. Many services
// create mocked instances if we are on a dev system
export function IsTargetSystem(): boolean {
    try {
        // if this file exists, we're almost definitely on the target platform
        fs.readFileSync("/var/tmp/.cone-type");
        return true;
    } catch (err) {
        // must be on a dev machine
        return false;
    }
}