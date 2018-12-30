import { Injectable, NestInterceptor, ExecutionContext, HttpException, HttpStatus } from "@nestjs/common";
import { Observable, throwError } from "rxjs";
import { tap } from "rxjs/operators";
import { catchError } from "rxjs/operators";

export class HttpErrorResponse {
    Error: string;
    response: ValidationError[];
    status: number;
    message: any[];
}

export class ValidationError {
    target: any;
    value: any;
    property: string;
    children: ValidationError[];
}

@Injectable()
export class ConstraintsInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, call$: Observable<any>): Observable<any> {
        return call$.pipe(
            catchError(err => {
                const httpError = err as HttpErrorResponse;
                if (httpError.status === 400) {
                    // possible constraint failure
                    if (httpError.response.length !== 0 && httpError.response[0] !== undefined) {
                        // find the failed constraint names
                        err.failedConstraints = [];
                        httpError.response[0].children.forEach(child => {
                            err.failedConstraints.push(child.property);
                        });
                    }
                }
                return throwError(new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR));
            }),
        );
    }
}
