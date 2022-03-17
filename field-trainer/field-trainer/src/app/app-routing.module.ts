import { NgModule } from "@angular/core";
import { RouterModule, Routes, CanActivate } from "@angular/router";

import { AuthGuardService as AuthGuard } from "./authentication/services/auth-guard.service";
import { AthleteManagementPageComponent } from "./athletes/components/athlete-management-page/athlete-management-page.component";
import { HomePageComponent } from "./home/components/home-page/home-page.component";
import { RegisterPageComponent } from "./user/components/register-page/register-page.component";
import { AddTeamComponent } from "./teams/components/add-team/add-team.component";
import { AppComponent } from "./misc/components/app/app";
import { AcademyComponent } from "./misc/components/academy/academy";
import { ConePageComponent } from "./misc/components/cones/cones";
import { LoginPageComponent } from "./authentication/components/login-page/login-page.component";
import { TeamManagementPageComponent } from "./teams/components/team-management-page/team-management-page.component";
import { AddAthletePageComponent } from "./athletes/components/add-athlete-page/add-athlete-page.component";
import { SandboxComponent } from "./utility/components/sandbox/sandbox.component";
import { ResultPageComponent } from "./session/components/result-page/result-page.component";
import { FieldCourseSetupComponent } from "./session/components/field-course-setup/field-course-setup.component";

const routes: Routes = [
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "home", component: HomePageComponent },
    { path: "register", component: RegisterPageComponent },
    {
        path: "add-team",
        component: AddTeamComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "field",
        component: FieldCourseSetupComponent,
    },
    {
        path: "app",
        component: AppComponent,
    },
    {
        path: "academy",
        component: AcademyComponent,
    },
    {
        path: "athlete-management",
        component: AthleteManagementPageComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "cone-page",
        component: ConePageComponent,
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
        path: "sandbox",
        component: SandboxComponent,
    },
    {
        path: "training/results",
        component: ResultPageComponent,
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: "reload", relativeLinkResolution: 'legacy' })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
