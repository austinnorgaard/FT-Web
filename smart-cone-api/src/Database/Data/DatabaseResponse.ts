import { DatabaseFailureType } from "./DatabaseEnums";

export class DatabaseResponse {
    constructor(
        public success?: boolean,
        public message?: string,
        public failureType?: DatabaseFailureType,
        public data?: any,
    ) {}
}
