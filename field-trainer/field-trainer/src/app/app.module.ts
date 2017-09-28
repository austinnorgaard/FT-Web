import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { MdListModule, MdButtonModule, MdMenuModule, MdToolbarModule, MdCardModule, MdExpansionModule, MdGridListModule } from '@angular/material';
import { ChangeDetectorRef } from '@angular/core';

import { DndModule } from 'ng2-dnd';

import { AppComponent } from './app.component';
import { ConeComponent } from './cone-component/cone.component';
import { ConeListComponent } from './cone-list-component/cone-list.component';
import { SetupComponent } from './setup-component/setup.component';
import { FTSessionComponent } from './ft-session-component/ft-session.component';
import { AppRoutingModule } from './app-routing.module';
import { SessionConeComponent } from './session-cone-component/session-cone.component';
import { PlayerSessionComponent } from './player-session-component/player-session.component';
import { PlayersComponent } from './players-component/players.component';
import { PlayerComponent } from './player-component/player.component';

import { ConesService } from './api/cones.service';
import { PlayersService } from './api/players.service';
import { HttpHelper } from './http-helper';

import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import * as c from '../../../../global-config';

const config: SocketIoConfig = { url: c.getSmartConeApiSocketUrl(), options: {} };

@NgModule({
  declarations: [
    AppComponent,
    ConeComponent,
    ConeListComponent,
    SetupComponent,
    FTSessionComponent,
    SessionConeComponent,
    PlayerSessionComponent,
    PlayersComponent,
    PlayerComponent
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
    MdGridListModule,
    HttpModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
    DndModule.forRoot(),
    FormsModule
  ],
  providers: [ ConesService, PlayersService, HttpHelper ],
  bootstrap: [AppComponent]
})
export class AppModule { }
