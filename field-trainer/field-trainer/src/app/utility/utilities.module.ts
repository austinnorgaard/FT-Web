import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SandboxComponent } from "./components/sandbox/sandbox.component";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
    imports: [CommonModule],
    declarations: [SandboxComponent],
})
export class UtilitiesModule {}
