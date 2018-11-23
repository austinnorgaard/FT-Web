import { NgModule } from "@angular/core";
import { RouterModule, Routes, CanActivate } from "@angular/router";

import { HomePageComponent } from "./home-page/home-page.component";
import { RegisterPageComponent } from "./register-page/register-page.component";
import { AddTeamComponent } from "./add-team/add-team.component";
import { AuthGuardService as AuthGuard } from "./authentication/services/auth-guard.service";
import { AthleteManagementPageComponent } from "./athlete-management-page/athlete-management-page.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { TeamManagementPageComponent } from "./team-management-page/team-management-page.component";
import { AddAthletePageComponent } from "./add-athlete-page/add-athlete-page.component";
import { FieldCourseSetupComponent } from "./field-course-setup/field-course-setup.component";
import { SessionSetupPageComponent } from "./session-setup-page/session-setup-page.component";
import { AthleteSelectComponent } from "./athlete-select/athlete-select.component";
import { TrainingSessionPageComponent } from "./training-session-page/training-session-page.component";

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
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
