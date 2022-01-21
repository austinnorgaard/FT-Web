import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthHeaderInterceptor } from "./auth-header-interceptor";
import { AuthGuardService } from "./services/auth-guard.service";
import { AuthService } from "./services/auth.service";
import { LoginService } from "./services/login.service";
import { LoginComponent } from "./components/login/login.component";
import { LoginPageComponent } from "./components/login-page/login-page.component";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { NgbAlertModule } from "@ng-bootstrap/ng-bootstrap";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        NgbAlertModule,
        FlexLayoutModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
    ],
    declarations: [LoginComponent, LoginPageComponent],
    providers: [
        AuthGuardService,
        AuthService,
        LoginService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthHeaderInterceptor,
            multi: true,
        },
    ],
})
export class AuthenticationModule {}
