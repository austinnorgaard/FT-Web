import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthHeaderInterceptor } from "./auth-header-interceptor";
import { AuthGuardService } from "./services/auth-guard.service";
import { AuthService } from "./services/auth.service";
import { LoginService } from "./services/login.service";

@NgModule({
    imports: [CommonModule],
    declarations: [],
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
