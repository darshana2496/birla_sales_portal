import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationService } from './services/authentication.service';
import { DateFormatPipe } from './utilities/pipes/date-format.pipe';
import { TimeInMinsFormatPipe } from './utilities/pipes/time-in-mins.pipe';
import {  HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { IonicStorageModule } from '@ionic/storage-angular';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, 
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },

    DateFormatPipe,
    TimeInMinsFormatPipe,
    AuthenticationService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
