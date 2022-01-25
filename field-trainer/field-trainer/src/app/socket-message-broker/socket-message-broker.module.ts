import { NgModule } from "@angular/core";
import { SocketMessageBrokerService } from "./socket-message-broker.service";
import { environment } from "../../environments/environment";

@NgModule({
    imports: [],
    providers: [SocketMessageBrokerService],
})
export class SocketMessageBrokerModule {}
