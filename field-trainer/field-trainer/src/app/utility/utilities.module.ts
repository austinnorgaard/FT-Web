import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SandboxComponent } from "./components/sandbox/sandbox.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { DebugComponent } from "./components/debug/debug.component";
import { SessionModule } from "../session/session.module";
import { MiscModule } from "../misc/misc.module";

@NgModule({
    imports: [CommonModule, FlexLayoutModule, SessionModule, MiscModule],
    declarations: [SandboxComponent, DebugComponent],
})
export class UtilitiesModule {}
