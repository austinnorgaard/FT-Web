import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SandboxComponent } from "./components/sandbox/sandbox.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { DebugComponent } from './components/debug/debug.component';

@NgModule({
    imports: [CommonModule],
    declarations: [SandboxComponent, DebugComponent],
})
export class UtilitiesModule {}
