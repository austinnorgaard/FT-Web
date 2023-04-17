"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseResponse_1 = require("../Database/Data/DatabaseResponse");
const DatabaseEnums_1 = require("../Database/Data/DatabaseEnums");
function GetDatabaseResponse(err) {
    if (err.name.includes("UniqueConstraintError")) {
        return new DatabaseResponse_1.DatabaseResponse(false, "Unique constraint violated", DatabaseEnums_1.DatabaseFailureType.UniqueConstraintViolated, err.fields);
    }
    return new DatabaseResponse_1.DatabaseResponse(false, "Unknown error", DatabaseEnums_1.DatabaseFailureType.UnknownError, err);
}
exports.GetDatabaseResponse = GetDatabaseResponse;
//# sourceMappingURL=database-error.js.map