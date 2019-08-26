import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SandboxComponent } from "./components/sandbox/sandbox.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { DebugComponent } from "./components/debug/debug.component";
import { SessionModule } from "../session/session.module";
import { MiscModule } from "../misc/misc.module";
import { ConesComponent } from "./components/cones/cones.component";
import { FieldConeComponent } from "./components/field-cone/field-cone.component";
import { MatCardModule, MatButtonModule, MatInputModule } from "@angular/material";
import { FormsModule } from "@angular/forms";

@NgModule({
    imports: [CommonModule, FlexLayoutModule, SessionModule, MiscModule, MatCardModule, MatButtonModule, MatInputModule, FormsModule],
    declarations: [SandboxComponent, DebugComponent, ConesComponent, FieldConeComponent],
})
export class UtilitiesModule {}
