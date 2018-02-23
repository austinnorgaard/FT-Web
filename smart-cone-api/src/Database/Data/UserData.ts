import { IsString } from "class-validator";

/* 
* Defines the data for a user, matches the required parameters
* for adding a user via POST
*/

export class UserData {
    @IsString() readonly prefix: string;
    @IsString() readonly firstName: string;
    @IsString() readonly lastName: string;
    @IsString() readonly address1: string;
    @IsString() readonly address2: string;
    @IsString() readonly city: string;
    @IsString() readonly state: string;
    @IsString() readonly zipCode: string;
    @IsString() readonly country: string;
    @IsString() readonly phoneNumber: string;
    @IsString() readonly email: string;
    @IsString() readonly passwordHash: string;
    @IsString() readonly passwordSalt: string;
}
