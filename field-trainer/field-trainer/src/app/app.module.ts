import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { JwtModule } from "@auth0/angular-jwt";
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from "ngx-perfect-scrollbar";
import { YesNoDialogComponent } from "./dialogs/yes-no/yes-no-dialog.component";

import { HomeModule } from "./home/home.module";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AthleteModule } from "./athletes/athlete.module";
import { TeamModule } from "./teams/team.module";
import { SessionModule } from "./session/session.module";
import { UserModule } from "./user/user.module";
import { AuthenticationModule } from "./authentication/authentication.module";

import { MatIconModule, MatButtonModule, MatSidenavModule, MatToolbarModule } from "@angular/material";
import { MiscModule } from "./misc/misc.module";
import { environment } from "../environments/environment";
import { UtilitiesModule } from "./utility/utilities.module";
import { SocketMessageBrokerModule } from "./socket-message-broker/socket-message-broker.module";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true,
};

export function tokenGetter() {
    return localStorage.getItem("token") || null;
}

@NgModule({
    declarations: [AppComponent, YesNoDialogComponent],
    imports: [
        NgbModule,
        BrowserModule,
        FlexLayoutModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        PerfectScrollbarModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
            },
        }),
        HomeModule,
        AthleteModule,
        TeamModule,
        SessionModule,
        UserModule,
        AuthenticationModule,
        MatSidenavModule,
        MatIconModule,
        MatButtonModule,
        MatToolbarModule,
        MiscModule,
        UtilitiesModule,
        SocketMessageBrokerModule,
    ],
    providers: [
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
        },
    ],
    bootstrap: [AppComponent],
    entryComponents: [YesNoDialogComponent],
})
export class AppModule {}
