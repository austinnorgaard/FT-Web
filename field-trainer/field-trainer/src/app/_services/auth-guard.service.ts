import { Injectable } from "@angular/core";
import {
    Router,
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(public auth: AuthService, public router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        if (!this.auth.isAuthenticated()) {
            // User is not logged in, redirect them to login, keep
            // track of where they are coming from so we can redirect later
            console.log(`Setting returnUrl to ${state.url}`);
            this.router.navigate(["login"], {
                queryParams: { returnUrl: state.url }
            });
            return false;
        }

        // User is logged in, so allow them to access the route
        return true;
    }
}
