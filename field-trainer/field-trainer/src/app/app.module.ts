import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { JwtModule } from "@auth0/angular-jwt";
import { SocketIoConfig, SocketIoModule } from "ngx-socket-io";
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { FT_CONFIG } from "../../global-config";
import { YesNoDialogComponent } from "./dialogs/yes-no/yes-no-dialog.component";

import { HomeModule } from "./home/home.module";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AthleteModule } from "./athletes/athlete.module";
import { TeamModule } from "./teams/team.module";
import { SessionModule } from "./session/session.module";
import { UserModule } from "./user/user.module";
import { AuthenticationModule } from "./authentication/authentication.module";

import { MatListModule, MatIconModule, MatButtonModule, MatCardModule, MatSidenavModule, MatToolbar, MatToolbarModule } from "@angular/material";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    // w/e
};

// const ip = FT_CONFIG.getSmartConeApiSocketUrl();
const config: SocketIoConfig = {
    url: "127.0.0.1:5000",
    options: {},
};

export function tokenGetter() {
    return localStorage.getItem("token") || null;
}

@NgModule({
    declarations: [AppComponent, YesNoDialogComponent],
    imports: [
        NgbModule.forRoot(),
        BrowserModule,
        FlexLayoutModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        SocketIoModule.forRoot(config),
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
    ],
    providers: [],
    bootstrap: [AppComponent],
    entryComponents: [YesNoDialogComponent],
})
export class AppModule {}
