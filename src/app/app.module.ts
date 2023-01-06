import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationService } from './services/authentication.service';
import { DateFormatPipe } from './utilities/pipes/date-format.pipe';
import { TimeInMinsFormatPipe } from './utilities/pipes/time-in-mins.pipe';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, 
    DateFormatPipe,
    TimeInMinsFormatPipe,
    AuthenticationService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
