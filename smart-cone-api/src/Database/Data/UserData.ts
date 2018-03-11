import { IsString } from "class-validator";

/* 
* Defines the data for a user, matches the required parameters
* for adding a user via POST
*/

export class UserData {
    @IsString() prefix: string;
    @IsString() firstName: string;
    @IsString() lastName: string;
    @IsString() address1: string;
    @IsString() address2: string;
    @IsString() city: string;
    @IsString() state: string;
    @IsString() zipCode: string;
    @IsString() country: string;
    @IsString() phoneNumber: string;
    @IsString() email: string;
    @IsString() password: string;
}
