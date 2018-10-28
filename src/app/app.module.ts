import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { DataTableModule } from 'primeng/primeng';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { ToNumberPipe } from './to-number.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ToNumberPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTableModule,
    HttpModule
  ],
  providers: [ AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
