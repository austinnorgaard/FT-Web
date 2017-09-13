import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

import { MdListModule, MdButtonModule } from '@angular/material';

import { AppComponent } from './app.component';
import { ConeComponent } from './cone-component/cone.component';
import { ConeListComponent } from './cone-list-component/cone-list.component';
import { SetupComponent } from './setup-component/setup.component';
import { FTSessionComponent } from './ft-session-component/ft-session.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    ConeComponent,
    ConeListComponent,
    SetupComponent,
    FTSessionComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MdListModule,
    MdButtonModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
