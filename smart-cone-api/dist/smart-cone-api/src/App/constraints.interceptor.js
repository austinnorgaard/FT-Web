"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
class HttpErrorResponse {
}
exports.HttpErrorResponse = HttpErrorResponse;
class ValidationError {
}
exports.ValidationError = ValidationError;
let ConstraintsInterceptor = class ConstraintsInterceptor {
    intercept(context, call$) {
        return call$.pipe(operators_1.catchError(err => {
            const httpError = err;
            if (httpError.status === 400) {
                if (httpError.response.length !== 0 && httpError.response[0] !== undefined) {
                    err.failedConstraints = [];
                    httpError.response[0].children.forEach(child => {
                        err.failedConstraints.push(child.property);
                    });
                }
            }
            return rxjs_1.throwError(new common_1.HttpException(err, httpError.status));
        }));
    }
};
ConstraintsInterceptor = __decorate([
    common_1.Injectable()
], ConstraintsInterceptor);
exports.ConstraintsInterceptor = ConstraintsInterceptor;
//# sourceMappingURL=constraints.interceptor.js.map