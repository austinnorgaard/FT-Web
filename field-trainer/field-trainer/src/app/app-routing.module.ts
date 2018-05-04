import { NgModule } from "@angular/core";
import { RouterModule, Routes, CanActivate } from "@angular/router";

import { SetupComponent } from "./setup-component/setup.component";
import { FTSessionComponent } from "./ft-session-component/ft-session.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { RegisterPageComponent } from "./register-page/register-page.component";
import { AddTeamComponent } from "./add-team/add-team.component";
import { AuthGuardService as AuthGuard } from "./_services/auth-guard.service";
import { AthleteManagementPageComponent } from "./athlete-management-page/athlete-management-page.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { TeamManagementPageComponent } from "./team-management-page/team-management-page.component";
import { AddAthletePageComponent } from "./add-athlete-page/add-athlete-page.component";
import { SessionSetupPageComponent } from "./session-setup-page/session-setup-page.component";

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", component: HomePageComponent },
    { path: "setup", component: SetupComponent },
    { path: "session", component: FTSessionComponent },
    { path: "register", component: RegisterPageComponent },
    {
        path: "add-team",
        component: AddTeamComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "athlete-management",
        component: AthleteManagementPageComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "login",
        component: LoginPageComponent,
    },
    {
        path: "team-management",
        component: TeamManagementPageComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "add-athlete",
        component: AddAthletePageComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "session-setup",
        component: SessionSetupPageComponent,
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
