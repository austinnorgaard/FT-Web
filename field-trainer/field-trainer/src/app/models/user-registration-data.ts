export class UserRegistrationData {
    constructor(
        public prefix?: string,
        public firstName?: string,
        public lastName?: string,
        public address1?: string,
        public address2?: string,
        public city?: string,
        public state?: string,
        public zipCode?: string,
        public country?: string,
        public phoneNumber?: string,
        public email?: string,
        public password?: string,
        public subscribeToNewsletter?: boolean
    ) {
        this.subscribeToNewsletter = false;
    }

    // returns if this instance is valid (all required fields are selected)
    isValid(): Boolean {
        if (this.prefix === null || this.prefix === "") return false;
        if (this.firstName === "") return false;
        if (this.lastName === "") return false;
        if (this.address1 === "") return false;
        if (this.address2 === "") return false;
        if (this.city === "") return false;
        if (this.state === "") return false;
        if (this.zipCode === "") return false;
        if (this.country === "") return false;
        if (this.phoneNumber === "") return false;
        if (this.email === "") return false;
        if (this.password === "") return false;

        return true;
    }
}
