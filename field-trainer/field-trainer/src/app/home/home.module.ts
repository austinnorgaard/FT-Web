import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomePageComponent } from "./components/home-page/home-page.component";
import { NavMenuContentComponent } from "./components/nav-menu-content/nav-menu-content.component";
import { StatusIndicatorComponent } from "./components/status-indicator/status-indicator.component";
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
import { WifiSettingsComponent } from "./components/wifi-settings/wifi-settings.component";
import { FormsModule } from "@angular/forms";
import { MiscModule } from "../misc/misc.module";
import { WiFiSettingsService } from "./services/wifi-settings.service";
import { SmartConeUpdateService } from "./services/smart-cone-update.service";
import { SmartConeInfoService } from './services/smart-cone-info.service';

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
    providers: [WiFiSettingsService, SmartConeUpdateService, SmartConeInfoService],
})
export class HomeModule {}
