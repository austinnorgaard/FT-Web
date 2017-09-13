import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

import { MdListModule, MdButtonModule, MdMenuModule, MdToolbarModule, MdCardModule, MdExpansionModule, MdGridListModule } from '@angular/material';

import { AppComponent } from './app.component';
import { ConeComponent } from './cone-component/cone.component';
import { ConeListComponent } from './cone-list-component/cone-list.component';
import { SetupComponent } from './setup-component/setup.component';
import { FTSessionComponent } from './ft-session-component/ft-session.component';
import { AppRoutingModule } from './app-routing.module';
import { SessionConeComponent } from './session-cone-component/session-cone.component';

@NgModule({
  declarations: [
    AppComponent,
    ConeComponent,
    ConeListComponent,
    SetupComponent,
    FTSessionComponent,
    SessionConeComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MdListModule,
    MdButtonModule,
    MdMenuModule,
    AppRoutingModule,
    MdToolbarModule,
    MdCardModule,
    MdExpansionModule,
    MdGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
