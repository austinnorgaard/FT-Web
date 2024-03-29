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
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatOptionModule } from "@angular/material/core";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { MatTreeModule } from "@angular/material/tree";
import { FormsModule } from "@angular/forms";
import { AthleteModule } from "../athletes/athlete.module";
import { TeamModule } from "../teams/team.module";
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AthleteOverviewComponent } from "./components/athlete-overview/athlete-overview.component";
import { SessionSetupService } from "./services/session-setup.service";
import { FieldConesService } from "./services/field-cones.service";
import { UtilitiesModule } from "../utility/utilities.module";
import { MiscModule } from "../misc/misc.module";
import { SessionDetailsPageComponent } from "./components/session-details-page/session-details-page.component";
import { SegmentDetailsComponent } from "./components/segment-details/segment-details.component";
import { ResultPageComponent } from "./components/result-page/result-page.component";
import { SessionResultComponent } from "./components/session-result/session-result.component";

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
        MatTableModule,
        MatIconModule,
        MatDividerModule,
        MiscModule,
        MatTreeModule,
    ],
    declarations: [
        AthleteSelectComponent,
        FieldCourseSetupComponent,
        FieldPreviewComponent,
        SessionSetupPageComponent,
        TrainingSessionPageComponent,
        AthleteOverviewComponent,
        SessionDetailsPageComponent,
        SegmentDetailsComponent,
        ResultPageComponent,
        SessionResultComponent,
    ],
    providers: [FieldsService, SessionService, SessionSetupService, FieldConesService],
})
export class SessionModule {}
