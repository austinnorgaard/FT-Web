"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const websockets_1 = require("@nestjs/websockets");
const environment_1 = require("../../../field-trainer/field-trainer/src/environments/environment");
const file_logger_1 = require("../Logging/file-logger");
const common_1 = require("@nestjs/common");
const field_cones_service_1 = require("../FieldCones/field-cones.service");
const child_process = require("child_process");
let FrontEndCommunicator = class FrontEndCommunicator {
    constructor(logger, fieldConesService) {
        this.logger = logger;
        this.fieldConesService = fieldConesService;
        this.frontEndSocket = null;
        this.logger.log("Enabling Websocket Gateway!");
        this.fieldConesService.connectedFieldCones.subscribe(cones => {
            if (this.frontEndSocket !== null) {
                this.frontEndSocket.emit("fieldConesConnected", { items: cones });
            }
        });
    }
    handleConnection(client, ...args) {
        this.logger.log(`Connection received from Front End.`);
        this.frontEndSocket = client;
        this.fieldConesService.connectedFieldCones.next(this.fieldConesService.connectedFieldCones.getValue());
        return {
            id: 10,
        };
    }
    handleDisconnect(client) {
        this.logger.log(`Disconnection received from Front End.`);
        this.frontEndSocket = null;
    }
    onTest(client, data) {
        const event = "test";
        return { event, data };
    }
    onSetTime(client, time) {
        const event = "SetTimeResponse";
        console.log(`Setting current time to: ${time.toString()}`);
        child_process.exec(`sudo date -s "${time.toString()}"`);
        this.fieldConesService.getFieldConeSockets().forEach(client => {
            client.client.emit("SetTime", time);
        });
        return { event, data: true };
    }
};
__decorate([
    websockets_1.SubscribeMessage("test"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], FrontEndCommunicator.prototype, "onTest", null);
__decorate([
    websockets_1.SubscribeMessage("SetTime"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Date]),
    __metadata("design:returntype", Object)
], FrontEndCommunicator.prototype, "onSetTime", null);
FrontEndCommunicator = __decorate([
    websockets_1.WebSocketGateway(parseInt(environment_1.environment.config.smartConeApiSocketPort, 10)),
    common_1.Injectable(),
    __metadata("design:paramtypes", [file_logger_1.FileLogger, field_cones_service_1.FieldConesService])
], FrontEndCommunicator);
exports.FrontEndCommunicator = FrontEndCommunicator;
//# sourceMappingURL=front-end-communicator.service.js.map