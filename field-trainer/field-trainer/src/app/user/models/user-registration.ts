import { UserRegistration } from "../../../../../../smart-cone-api/src/Users/user-registration";
import { UserModel } from "./user";

export class UserRegistrationModel extends UserRegistration {
    constructor() {
        super();
        this.user = new UserModel();
    }

    // returns if this instance is valid (all required fields are selected)
    isValid(): Boolean {
        if (this.user.firstName === "") {
            return false;
        }
        if (this.user.lastName === "") {
            return false;
        }
        if (this.user.address1 === "") {
            return false;
        }
        if (this.user.address2 === "") {
            return false;
        }
        if (this.user.city === "") {
            return false;
        }
        if (this.user.state === "") {
            return false;
        }
        if (this.user.zipCode === "") {
            return false;
        }
        if (this.user.country === "") {
            return false;
        }
        if (this.user.phoneNumber === "") {
            return false;
        }
        if (this.user.email === "") {
            return false;
        }
        if (this.password === "") {
            return false;
        }

        return true;
    }
}
