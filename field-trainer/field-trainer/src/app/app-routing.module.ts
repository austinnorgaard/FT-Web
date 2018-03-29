import { NgModule } from "@angular/core";
import { RouterModule, Routes, CanActivate } from "@angular/router";

import { SetupComponent } from "./setup-component/setup.component";
import { FTSessionComponent } from "./ft-session-component/ft-session.component";
import { WelcomePageComponent } from "./welcome-page/welcome-page.component";
import { RegisterPageComponent } from "./register-page/register-page.component";
import { AddTeamComponent } from "./add-team/add-team.component";
import { AuthGuardService as AuthGuard } from "./_services/auth-guard.service";

const routes: Routes = [
    { path: "", redirectTo: "/register", pathMatch: "full" },
    { path: "welcome", component: WelcomePageComponent },
    { path: "setup", component: SetupComponent },
    { path: "session", component: FTSessionComponent },
    { path: "register", component: RegisterPageComponent },
    {
        path: "add-team",
        component: AddTeamComponent
        // canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
