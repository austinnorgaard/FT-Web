import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, FormControl } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FlexLayoutModule } from "@angular/flex-layout";
import { RouterModule } from "@angular/router";
import { HttpModule, RequestOptions } from "@angular/http";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import {
    MatListModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatCardModule,
    MatExpansionModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatIconModule,
    MatTooltipModule,
    MatRadioModule,
    MatDividerModule
} from "@angular/material";
import { ChangeDetectorRef } from "@angular/core";

import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { PERFECT_SCROLLBAR_CONFIG } from "ngx-perfect-scrollbar";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    // w/e
};

import { DndModule } from "ng2-dnd";

import { AppComponent } from "./app.component";
import { ConeComponent } from "./cone-component/cone.component";
import { ConeListComponent } from "./cone-list-component/cone-list.component";
import { SetupComponent } from "./setup-component/setup.component";
import { FTSessionComponent } from "./ft-session-component/ft-session.component";
import { AppRoutingModule } from "./app-routing.module";
import { SessionConeComponent } from "./session-cone-component/session-cone.component";
import { PlayerSessionComponent } from "./player-session-component/player-session.component";
import { PlayersComponent } from "./players-component/players.component";
import { PlayerComponent } from "./player-component/player.component";
import { SegmentComponent } from "./segment-component/segment.component";

import { ConesService } from "./api/cones.service";
import { PlayersService } from "./api/players.service";
import { PlayerSessionService } from "./api/player-session.service";
import { TeamManagementService } from "./api/team-management.service";
import { HttpHelper } from "./http-helper";

import { SocketIoModule, SocketIoConfig } from "ng-socket-io";
import * as c from "../../global-config";
import { HomePageComponent } from "./home-page/home-page.component";
import { RegisterPageComponent } from "./register-page/register-page.component";
import { NavMenuContentComponent } from "./nav-menu-content/nav-menu-content.component";
import { StatusIndicatorComponent } from "./status-indicator/status-indicator.component";
import { LoginComponent } from "./login/login.component";
import { UserManagementService } from "./api/user-management.service";
import { AddTeamComponent } from "./add-team/add-team.component";
import { AuthGuardService } from "./_services/auth-guard.service";
import { AuthService } from "./_services/auth.service";
import { JwtHelper } from "angular2-jwt";
import { LoginService } from "./api/login.service";
import { AuthHeaderInterceptor } from "./_services/auth-header-interceptor";
import { AthleteManagementComponent } from "./athlete-management/athlete-management.component";
import { AthleteManagementService } from "./api/athlete-management.service";
import { LoginPageComponent } from "./login-page/login-page.component";
import { TeamManagementPageComponent } from "./team-management-page/team-management-page.component";

const config: SocketIoConfig = {
    url: c.getSmartConeApiSocketUrl(),
    options: {}
};

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
        AthleteManagementComponent,
        LoginPageComponent,
        TeamManagementPageComponent
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
        HttpModule,
        HttpClientModule,
        SocketIoModule.forRoot(config),
        DndModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatTooltipModule,
        MatRadioModule,
        PerfectScrollbarModule
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
        JwtHelper,
        LoginService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthHeaderInterceptor,
            multi: true
        },
        AthleteManagementService,
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
