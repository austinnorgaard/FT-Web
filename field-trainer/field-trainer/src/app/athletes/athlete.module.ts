import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { AuthenticationModule } from "../authentication/authentication.module";
import { AthleteComponent } from "./components/athlete/athlete.component";
import { AddAthletePageComponent } from "./components/add-athlete-page/add-athlete-page.component";
import { AthleteManagementPageComponent } from "./components/athlete-management-page/athlete-management-page.component";
import { AthleteManagementService } from "./services/athlete-management.service";
import { FormsModule } from "@angular/forms";
import {
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,
    MatCardModule,
    MatExpansionModule,
    MatButtonModule,
    MatInputModule,
} from "@angular/material";
import { TeamManagementAthleteComponent } from "./components/team-management-athlete/team-management-athlete.component";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
    imports: [
        CommonModule,
        AuthenticationModule,
        MatIconModule,
        MatCardModule,
        MatExpansionModule,
        MatFormFieldModule,
        FormsModule,
        MatSelectModule,
        MatOptionModule,
        PerfectScrollbarModule,
        FlexLayoutModule,
        MatButtonModule,
        MatInputModule,
    ],
    declarations: [AddAthletePageComponent, AthleteComponent, AthleteManagementPageComponent, TeamManagementAthleteComponent],
    providers: [AthleteManagementService],
    exports: [TeamManagementAthleteComponent, AthleteComponent],
})
export class AthleteModule {}
