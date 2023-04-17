"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const athletes_controller_1 = require("./athletes.controller");
const database_module_1 = require("../Database/database.module");
const common_1 = require("@nestjs/common");
const passport = require("passport");
const athletes_service_1 = require("./athletes.service");
const teams_service_1 = require("../Teams/teams.service");
let AthletesModule = class AthletesModule {
    configure(consumer) {
        consumer.apply(passport.authenticate("jwt", { session: false })).forRoutes(athletes_controller_1.AthletesController);
    }
};
AthletesModule = __decorate([
    common_1.Module({
        providers: [athletes_service_1.AthletesService, teams_service_1.TeamsService],
        controllers: [athletes_controller_1.AthletesController],
        imports: [database_module_1.DatabaseModule],
    })
], AthletesModule);
exports.AthletesModule = AthletesModule;
//# sourceMappingURL=athletes.module.js.map