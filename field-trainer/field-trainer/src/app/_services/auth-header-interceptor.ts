import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest
} from "@angular/common/http";
import { Observable } from "rxjs/Observable";

export class AuthHeaderInterceptor implements HttpInterceptor {
    constructor() {
        this.token = localStorage.getItem("token");
    }

    token: string;
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const clonedRequest = req.clone({
            setHeaders: { Authorization: `Bearer ${this.token}` }
        });

        return next.handle(clonedRequest);
    }
}