import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { MatListModule, MatButtonModule, MatMenuModule, MatToolbarModule, MatCardModule,
  MatExpansionModule, MatGridListModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCheckboxModule } from '@angular/material';
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
import { SegmentComponent } from './segment-component/segment.component';

import { ConesService } from './api/cones.service';
import { PlayersService } from './api/players.service';
import { PlayerSessionService } from './api/player-session.service';
import { HttpHelper } from './http-helper';

import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import * as c from '../../global-config';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';

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
    PlayerComponent,
    SegmentComponent,
    WelcomePageComponent,
    RegisterPageComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatListModule,
    MatButtonModule,
    MatMenuModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    AppRoutingModule,
    MatToolbarModule,
    MatCardModule,
    MatExpansionModule,
    MatGridListModule,
    HttpModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
    DndModule.forRoot(),
    FormsModule
  ],
  providers: [ ConesService, PlayersService, HttpHelper, PlayerSessionService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
