import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { AddTeamComponent } from "./components/add-team/add-team.component";
import { TeamManagementPageComponent } from "./components/team-management-page/team-management-page.component";
import { TeamManagementService } from "./services/team-management.service";
import {
    MatOptionModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
} from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AthleteModule } from "../athletes/athlete.module";
import { NgbAlertModule } from "@ng-bootstrap/ng-bootstrap";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
    imports: [
        CommonModule,
        MatInputModule,
        MatExpansionModule,
        NgbAlertModule,
        MatFormFieldModule,
        FormsModule,
        MatOptionModule,
        MatSelectModule,
        MatIconModule,
        AthleteModule,
        PerfectScrollbarModule,
        FlexLayoutModule,
        MatButtonModule,
        ReactiveFormsModule,
    ],
    declarations: [AddTeamComponent, TeamManagementPageComponent],
    providers: [TeamManagementService],
})
export class TeamModule {}
