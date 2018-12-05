import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { AthleteSelectComponent } from "./components/athlete-select/athlete-select.component";
import { FieldCourseSetupComponent } from "./components/field-course-setup/field-course-setup.component";
import { FieldPreviewComponent } from "./components/field-preview/field-preview.component";
import { SessionSetupPageComponent } from "./components/session-setup-page/session-setup-page.component";
import { TrainingSessionPageComponent } from "./components/training-session-page/training-session-page.component";
import { FieldsService } from "./services/fields.service";
import { SessionService } from "./services/session.service";
import { MatOptionModule, MatFormFieldModule, MatSelectModule, MatButtonModule, MatDialog, MatDialogModule, MatCardModule } from "@angular/material";
import { FormsModule } from "@angular/forms";
import { AthleteModule } from "../athletes/athlete.module";
import { TeamModule } from "../teams/team.module";
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
    imports: [
        CommonModule,
        MatOptionModule,
        RouterModule,
        PerfectScrollbarModule,
        MatFormFieldModule,
        FormsModule,
        AthleteModule,
        TeamModule,
        MatSelectModule,
        FlexLayoutModule,
        MatButtonModule,
        MatDialogModule,
        MatCardModule,
    ],
    declarations: [AthleteSelectComponent, FieldCourseSetupComponent, FieldPreviewComponent, SessionSetupPageComponent, TrainingSessionPageComponent],
    providers: [FieldsService, SessionService],
})
export class SessionModule {}
