import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomePageComponent } from "./components/home-page/home-page.component";
import { NavMenuContentComponent } from "./components/nav-menu-content/nav-menu-content.component";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatTooltipModule } from "@angular/material/tooltip";
import { FlexLayoutModule } from "@angular/flex-layout";
import { RouterModule } from "@angular/router";
import { AuthenticationModule } from "../authentication/authentication.module";
import { FormsModule } from "@angular/forms";
import { MiscModule } from "../misc/misc.module";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FlexLayoutModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatTooltipModule,
        MatButtonModule,
        AuthenticationModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MiscModule,
    ],
    declarations: [HomePageComponent],
    exports: [NavMenuContentComponent]
})
export class HomeModule {}
