export class UserRegistrationData {
    prefix: string;
    firstName: string;
    lastName: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phoneNumber: string;
    emailAddress: string;
    password: string;
    subscribeToNewsletter: boolean;

    constructor() {
        this.prefix = "";
        this.firstName = "";
        this.lastName = "";
        this.address1 = "";
        this.address2 = "";
        this.city = "";
        this.state = "";
        this.zipCode = "";
        this.country = "";
        this.phoneNumber = "";
        this.emailAddress = "";
        this.password = "";
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
        if (this.emailAddress === "") return false;
        if (this.password === "") return false;

        return true;
    }
}
