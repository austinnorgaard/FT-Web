import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ConeComponent } from './cone-component/cone.component';
import { ConeListComponent } from './cone-list-component/cone-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MdListModule, MdButtonModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    ConeComponent,
    ConeListComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MdListModule,
    MdButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
