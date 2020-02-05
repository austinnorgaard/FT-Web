import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomePageComponent } from "./components/home-page/home-page.component";
import { NavMenuContentComponent } from "./components/nav-menu-content/nav-menu-content.component";
import { StatusIndicatorComponent } from "./components/status-indicator/status-indicator.component";
import {
    MatIconModule,
    MatListModule,
    MatTooltipModule,
    MatSidenavModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
} from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";
import { RouterModule } from "@angular/router";
import { AuthenticationModule } from "../authentication/authentication.module";
import { WifiSettingsComponent } from "./components/wifi-settings/wifi-settings.component";
import { FormsModule } from "@angular/forms";
import { MiscModule } from "../misc/misc.module";
import { WiFiSettingsService } from "./services/wifi-settings.service";

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
    declarations: [HomePageComponent, NavMenuContentComponent, StatusIndicatorComponent, WifiSettingsComponent],
    exports: [NavMenuContentComponent, StatusIndicatorComponent],
    providers: [WiFiSettingsService],
})
export class HomeModule {}
