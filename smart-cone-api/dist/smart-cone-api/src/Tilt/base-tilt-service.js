"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
class BaseTiltService {
    constructor() {
        this._tiltsEnabled = 0;
        this.TiltOccured = new rxjs_1.Subject();
    }
    tiltsEnabled() {
        return this._tiltsEnabled > 0;
    }
    setTiltsEnabled(value) {
        if (value) {
            console.log('Adding additional tilts enabled count');
            this._tiltsEnabled++;
        }
        else {
            console.log('Decreasing tilts enabled count');
            this._tiltsEnabled--;
        }
    }
}
exports.BaseTiltService = BaseTiltService;
//# sourceMappingURL=base-tilt-service.js.map