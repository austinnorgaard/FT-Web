import { DatabaseResponse } from "../Database/Data/DatabaseResponse";
import { DatabaseFailureType } from "../Database/Data/DatabaseEnums";

// https://github.com/darrenmsmith/FT-WEB/issues/7

// Take in err objects from failed db calls, parse for known errors and return
// appropriate DatabaseResponse objects

export namespace DatabaseError {
    export function GetResponse(err: any): DatabaseResponse {
        if (err.name.includes("UniqueConstraintError")) {
            return new DatabaseResponse(
                false,
                "Unique constraint violated",
                DatabaseFailureType.UniqueConstraintViolated,
                err.fields // the fields which were violated
            );
        }

        // Not a known error, just return unknown error
        return new DatabaseResponse(
            false,
            "Unknown error",
            DatabaseFailureType.UnknownError,
            err // include all info so debug is easier
        );
    }
}
