import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NgsRevealModule } from 'ngx-scrollreveal';
import { NavComponent } from './navbar/nav.component';

@NgModule({
  imports: [BrowserModule, FormsModule, NgsRevealModule],
  declarations: [AppComponent, NavComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
