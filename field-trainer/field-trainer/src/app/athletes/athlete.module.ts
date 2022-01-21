import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { AuthenticationModule } from "../authentication/authentication.module";
import { AthleteComponent } from "./components/athlete/athlete.component";
import { AddAthletePageComponent } from "./components/add-athlete-page/add-athlete-page.component";
import { AthleteManagementPageComponent } from "./components/athlete-management-page/athlete-management-page.component";
import { AthleteManagementService } from "./services/athlete-management.service";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatOptionModule } from "@angular/material/core";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
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
