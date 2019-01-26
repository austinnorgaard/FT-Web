import { NgModule } from "@angular/core";
import { SocketMessageBrokerService } from "./socket-message-broker.service";
import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";

const config: SocketIoConfig = {
    url: "127.0.0.1:5000",
    options: {},
};

@NgModule({
    imports: [SocketIoModule.forRoot(config)],
    providers: [SocketMessageBrokerService],
})
export class SocketMessageBrokerModule {}
