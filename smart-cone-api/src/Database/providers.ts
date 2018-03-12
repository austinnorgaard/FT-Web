import { User } from "./Models/User";
import { Team } from "./Models/Team";

export const ftProviders = [
    {
        provide: "UsersRepository",
        useValue: User
    },
    {
        provide: "TeamsRepository",
        useValue: Team
    }
];
