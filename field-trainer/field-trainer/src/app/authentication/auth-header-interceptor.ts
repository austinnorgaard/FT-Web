import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export class AuthHeaderInterceptor implements HttpInterceptor {
    constructor() {
        this.token = localStorage.getItem("token");
    }

    token: string;
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.token = localStorage.getItem("token");
        const clonedRequest = req.clone({
            setHeaders: { Authorization: `Bearer ${this.token}` },
        });

        return next.handle(clonedRequest);
    }
}
