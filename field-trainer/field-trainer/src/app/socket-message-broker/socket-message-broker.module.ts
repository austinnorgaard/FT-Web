import { NgModule } from "@angular/core";
import { SocketMessageBrokerService } from "./socket-message-broker.service";
import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";

const config: SocketIoConfig = {
    url: "192.168.42.1:5000",
    options: {},
};

@NgModule({
    imports: [SocketIoModule.forRoot(config)],
    providers: [SocketMessageBrokerService],
})
export class SocketMessageBrokerModule {}
