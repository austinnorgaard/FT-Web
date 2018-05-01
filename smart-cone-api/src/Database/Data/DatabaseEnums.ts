/*
In DatabaseResponse.ts, when success flag is set to false, this enum
will describe what went wrong
*/

export enum DatabaseFailureType {
    UniqueConstraintViolated = 1, // Something like multiple emails
    UnknownError = 2,
}
