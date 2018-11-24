import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomePageComponent } from "./components/home-page/home-page.component";
import { NavMenuContentComponent } from "./components/nav-menu-content/nav-menu-content.component";
import { StatusIndicatorComponent } from "./components/status-indicator/status-indicator.component";
import { MatIconModule, MatListModule, MatTooltipModule, MatSidenavModule, MatButtonModule } from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";
import { RouterModule } from "@angular/router";

@NgModule({
    imports: [CommonModule, RouterModule, FlexLayoutModule, MatSidenavModule, MatIconModule, MatListModule, MatTooltipModule, MatButtonModule],
    declarations: [HomePageComponent, NavMenuContentComponent, StatusIndicatorComponent],
    exports: [NavMenuContentComponent, StatusIndicatorComponent],
})
export class HomeModule {}
