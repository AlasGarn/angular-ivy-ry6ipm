import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NgsRevealModule } from 'ngx-scrollreveal';
import { NavComponent } from './navbar/nav.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [ BrowserModule,
    RouterModule.forRoot([
      {path: 'projects', component: ProjectsComponent},
      {path: 'home', component:HomeComponent}, FormsModule, NgsRevealModule, RouterModule],
  declarations: [AppComponent, NavComponent, HomeComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
