import { NgModule } from "@angular/core";
import { RouterModule, Routes, CanActivate } from "@angular/router";

import { SetupComponent } from "./setup-component/setup.component";
import { FTSessionComponent } from "./ft-session-component/ft-session.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { RegisterPageComponent } from "./register-page/register-page.component";
import { AddTeamComponent } from "./add-team/add-team.component";
import { AuthGuardService as AuthGuard } from "./_services/auth-guard.service";
import { AthleteManagementComponent } from "./athlete-management/athlete-management.component";
import { LoginPageComponent } from "./login-page/login-page.component";

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", component: HomePageComponent },
    { path: "setup", component: SetupComponent },
    { path: "session", component: FTSessionComponent },
    { path: "register", component: RegisterPageComponent },
    {
        path: "add-team",
        component: AddTeamComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "athlete-management",
        component: AthleteManagementComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "login",
        component: LoginPageComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
