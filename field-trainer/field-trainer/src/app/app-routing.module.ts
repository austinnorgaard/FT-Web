import { NgModule } from "@angular/core";
import { RouterModule, Routes, CanActivate } from "@angular/router";

import { AuthGuardService as AuthGuard } from "./authentication/services/auth-guard.service";
import { AthleteManagementPageComponent } from "./athletes/components/athlete-management-page/athlete-management-page.component";
import { AthleteSelectComponent } from "./session/components/athlete-select/athlete-select.component";
import { HomePageComponent } from "./home/components/home-page/home-page.component";
import { RegisterPageComponent } from "./user/components/register-page/register-page.component";
import { AddTeamComponent } from "./teams/components/add-team/add-team.component";
import { LoginPageComponent } from "./authentication/components/login-page/login-page.component";
import { TeamManagementPageComponent } from "./teams/components/team-management-page/team-management-page.component";
import { AddAthletePageComponent } from "./athletes/components/add-athlete-page/add-athlete-page.component";
import { SessionSetupPageComponent } from "./session/components/session-setup-page/session-setup-page.component";
import { TrainingSessionPageComponent } from "./session/components/training-session-page/training-session-page.component";
import { FieldCourseSetupComponent } from "./session/components/field-course-setup/field-course-setup.component";
import { SandboxComponent } from "./utility/components/sandbox/sandbox.component";

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", component: HomePageComponent },
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
        children: [
            { path: "", redirectTo: "field-select", pathMatch: "full" },
            { path: "field-select", component: FieldCourseSetupComponent },
            { path: "athlete-select", component: AthleteSelectComponent },
        ],
    },
    {
        path: "training-session",
        component: TrainingSessionPageComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "sandbox",
        component: SandboxComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
