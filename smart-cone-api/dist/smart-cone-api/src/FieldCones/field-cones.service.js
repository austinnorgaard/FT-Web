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
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const environment_1 = require("../../../field-trainer/field-trainer/src/environments/environment");
const field_cone_info_1 = require("./field-cone-info");
const rxjs_1 = require("rxjs");
const ping_data_1 = require("./ping-data");
const base_wifi_service_1 = require("../Wifi/base-wifi.service");
let FieldConesService = class FieldConesService {
    constructor(wifiService) {
        this.wifiService = wifiService;
        this.onConnectSubject = new rxjs_1.Subject();
        this.connectedFieldCones = new rxjs_1.BehaviorSubject([]);
        this.onTilt = new rxjs_1.Subject();
        this.clients = [];
        console.log("Field Cones Service instantiated!");
        this.onConnectSubject.subscribe({
            next: cone => {
                console.log(`Received new cone data! ConeID: ${cone.id}. Session ID: ${cone.sessionId}. IP: ${cone.ip}`);
                if (this.connectedFieldCones.getValue().some(item => item.id === cone.id)) {
                    console.log(`WARNING: Cone ${cone.id} is already in our Field Cones list!`);
                }
                cone.latencyStartTime = new Date();
                const value = this.connectedFieldCones.getValue();
                value.push(cone);
                this.connectedFieldCones.next(value);
                const client = this.clients.find(c => c.id === cone.id);
                if (client === null || client === undefined) {
                    console.log(`COULD NOT FIND SOCKET IO CLIENT FOR CONE ID ${cone.id}! THIS IS BAD`);
                    return;
                }
                client.client.emit("FieldConePing", ping_data_1.PING_DATA);
            },
        });
        this.wifiService.getWifiSettingsObservable().subscribe(wifiSettings => {
            this.connectedFieldCones.getValue().forEach(cone => {
                const client = this.getFieldConeSocketClient(cone.id);
                if (client) {
                    client.client.emit("SetWifiSettings", {
                        settings: wifiSettings,
                    });
                }
                else {
                    console.log(`Could not get field cone id for cone id: ${cone.id}`);
                }
            });
        });
    }
    handleConnection(client, ...args) {
        console.log(`Gateway connect from client id ${client.id}.`);
        console.log(`Using a ping data size of ${ping_data_1.PING_DATA.length}`);
    }
    handleDisconnect(client) {
        console.log(`Gateway disconnect for client id ${client.id}`);
        let value = this.connectedFieldCones.getValue();
        value = value.filter(v => v.sessionId !== client.id);
        this.connectedFieldCones.next(value);
    }
    getFieldConeSocketClient(id) {
        const client = this.clients.find(c => c.id === id);
        if (client) {
            return client;
        }
        return undefined;
    }
    getFieldConeSockets() {
        return this.clients;
    }
    onInitialContact(client, data) {
        console.log(`Contacted by a field cone! Their info, cone ID: ${data.id} at ${data.ip}`);
        const _ourClient = this.clients.find(c => c.id === data.id);
        if (_ourClient === null || _ourClient === undefined) {
            this.clients.push({
                id: data.id,
                client: client,
            });
        }
        else {
            _ourClient.client = client;
        }
        client.emit("InitializeWifiSettings", this.wifiService.getWifiSettings());
        client.emit("SetTime", new Date());
        this.onConnectSubject.next({ id: data.id, ip: data.ip, sessionId: client.id, latencyResults: [], version: data.version });
    }
    onTiltEvent(client, data) {
        console.log("on tilt event!");
        if (client === undefined || client === null) {
            console.log("Client information is not valid.");
            return;
        }
        const cone = this.connectedFieldCones.getValue().find(c => c.sessionId === client.id);
        if (cone !== undefined && cone !== null) {
            this.onTilt.next(cone);
        }
    }
    onConeUpdated(client, data) {
        let coneArray = this.connectedFieldCones.getValue();
        let extractedCone = coneArray.find(cone => cone.sessionId === client.id);
        let extractedConeId = coneArray.findIndex(cone => cone.sessionId === client.id);
        extractedCone.id = data.id;
        extractedCone.ip = data.ip;
        coneArray[extractedConeId];
        this.connectedFieldCones.next(coneArray);
    }
    onFieldConePingResponse(client, data) {
        const currentTime = new Date();
        let fieldCones = this.connectedFieldCones.getValue();
        let fieldCone = fieldCones.find(f => f.sessionId === client.id);
        if (fieldCone === undefined || fieldCone === null) {
            console.log(`WARN!! Got a Field Cone Ping for a cone which we don't know about!!`);
            return;
        }
        fieldCone.latencyResults.push(currentTime.getTime() - fieldCone.latencyStartTime.getTime());
        this.connectedFieldCones.next(fieldCones);
        setTimeout(() => {
            fieldCone.latencyStartTime = new Date();
            client.emit("FieldConePing", "HELLO");
        }, 3000);
    }
};
__decorate([
    websockets_1.SubscribeMessage("initialContact"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, field_cone_info_1.FieldConeInfo]),
    __metadata("design:returntype", void 0)
], FieldConesService.prototype, "onInitialContact", null);
__decorate([
    websockets_1.SubscribeMessage("tiltOccurred"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], FieldConesService.prototype, "onTiltEvent", null);
__decorate([
    websockets_1.SubscribeMessage("coneChanged"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, field_cone_info_1.FieldConeInfo]),
    __metadata("design:returntype", void 0)
], FieldConesService.prototype, "onConeUpdated", null);
__decorate([
    websockets_1.SubscribeMessage("FieldConePingResponse"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], FieldConesService.prototype, "onFieldConePingResponse", null);
FieldConesService = __decorate([
    common_1.Injectable(),
    websockets_1.WebSocketGateway(parseInt(environment_1.environment.config.coneApiSocketPort, 10)),
    __metadata("design:paramtypes", [base_wifi_service_1.BaseWifiService])
], FieldConesService);
exports.FieldConesService = FieldConesService;
//# sourceMappingURL=field-cones.service.js.map