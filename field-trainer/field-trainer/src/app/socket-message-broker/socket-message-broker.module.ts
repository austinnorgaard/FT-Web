import { NgModule } from "@angular/core";
import { SocketMessageBrokerService } from "./socket-message-broker.service";
import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";
import { environment } from "../../environments/environment";

const config: SocketIoConfig = {
    url: `${environment.config.startConeIp}:${environment.config.smartConeApiSocketPort}`,
    options: {},
};

@NgModule({
    imports: [SocketIoModule.forRoot(config)],
    providers: [SocketMessageBrokerService],
})
export class SocketMessageBrokerModule {}
