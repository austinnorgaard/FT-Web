import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    MatDialogModule,
} from "@angular/material";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { JwtModule } from "@auth0/angular-jwt";
import { SocketIoConfig, SocketIoModule } from "ngx-socket-io";
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { FT_CONFIG } from "../../global-config";
import { AuthGuardService } from "./_services/auth-guard.service";
import { AuthHeaderInterceptor } from "./_services/auth-header-interceptor";
import { AuthService } from "./_services/auth.service";
import { AddAthletePageComponent } from "./add-athlete-page/add-athlete-page.component";
import { AddTeamComponent } from "./add-team/add-team.component";
import { AthleteManagementService } from "./api/athlete-management.service";
import { ConesService } from "./api/cones.service";
import { LoginService } from "./api/login.service";
import { PlayerSessionService } from "./api/player-session.service";
import { PlayersService } from "./api/players.service";
import { TeamManagementService } from "./api/team-management.service";
import { UserManagementService } from "./api/user-management.service";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AthleteManagementPageComponent } from "./athlete-management-page/athlete-management-page.component";
import { ConeComponent } from "./cone-component/cone.component";
import { ConeListComponent } from "./cone-list-component/cone-list.component";
import { FTSessionComponent } from "./ft-session-component/ft-session.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { HttpHelper } from "./http-helper";
import { LoginPageComponent } from "./login-page/login-page.component";
import { LoginComponent } from "./login/login.component";
import { NavMenuContentComponent } from "./nav-menu-content/nav-menu-content.component";
import { PlayerComponent } from "./player-component/player.component";
import { PlayerSessionComponent } from "./player-session-component/player-session.component";
import { PlayersComponent } from "./players-component/players.component";
import { RegisterPageComponent } from "./register-page/register-page.component";
import { SegmentComponent } from "./segment-component/segment.component";
import { SessionConeComponent } from "./session-cone-component/session-cone.component";
import { SetupComponent } from "./setup-component/setup.component";
import { StatusIndicatorComponent } from "./status-indicator/status-indicator.component";
import { TeamManagementAthleteComponent } from "./team-management-athlete/team-management-athlete.component";
import { TeamManagementPageComponent } from "./team-management-page/team-management-page.component";
import { FieldPreviewComponent } from "./field-preview/field-preview.component";
import { FieldsService } from "./api/fields.service";
import { FieldCourseSetupComponent } from "./field-course-setup/field-course-setup.component";
import { SessionSetupPageComponent } from "./session-setup-page/session-setup-page.component";
import { AthleteSelectComponent } from "./athlete-select/athlete-select.component";
import { SessionService } from "./api/session.service";
import { AthleteComponent } from "./athlete/athlete.component";
import { YesNoDialogComponent } from "./dialogs/yes-no/yes-no-dialog.component";
import { TrainingSessionPageComponent } from "./training-session-page/training-session-page.component";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    // w/e
};

// const ip = FT_CONFIG.getSmartConeApiSocketUrl();
const config: SocketIoConfig = {
    url: "192.168.42.1:5000",
    options: {},
};

export function tokenGetter() {
    return localStorage.getItem("token") || null;
}

@NgModule({
    declarations: [
        AppComponent,
        ConeComponent,
        ConeListComponent,
        SetupComponent,
        FTSessionComponent,
        SessionConeComponent,
        PlayerSessionComponent,
        PlayersComponent,
        PlayerComponent,
        SegmentComponent,
        HomePageComponent,
        RegisterPageComponent,
        NavMenuContentComponent,
        StatusIndicatorComponent,
        LoginComponent,
        AddTeamComponent,
        AddAthletePageComponent,
        LoginPageComponent,
        TeamManagementPageComponent,
        TeamManagementAthleteComponent,
        AthleteManagementPageComponent,
        FieldPreviewComponent,
        FieldCourseSetupComponent,
        SessionSetupPageComponent,
        AthleteSelectComponent,
        AthleteComponent,
        YesNoDialogComponent,
        TrainingSessionPageComponent,
    ],
    imports: [
        NgbModule.forRoot(),
        BrowserModule,
        FlexLayoutModule,
        BrowserAnimationsModule,
        MatListModule,
        MatButtonModule,
        MatMenuModule,
        MatCheckboxModule,
        MatSidenavModule,
        MatInputModule,
        MatSelectModule,
        MatFormFieldModule,
        AppRoutingModule,
        MatToolbarModule,
        MatCardModule,
        MatExpansionModule,
        MatGridListModule,
        MatDividerModule,
        HttpClientModule,
        SocketIoModule.forRoot(config),
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatTooltipModule,
        MatDialogModule,
        MatRadioModule,
        PerfectScrollbarModule,
        MatStepperModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
            },
        }),
    ],
    providers: [
        ConesService,
        PlayersService,
        HttpHelper,
        PlayerSessionService,
        UserManagementService,
        TeamManagementService,
        AuthGuardService,
        AuthService,
        LoginService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthHeaderInterceptor,
            multi: true,
        },
        AthleteManagementService,
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
        },
        FieldsService,
        SessionService,
    ],
    bootstrap: [AppComponent],
    entryComponents: [YesNoDialogComponent],
})
export class AppModule {}
