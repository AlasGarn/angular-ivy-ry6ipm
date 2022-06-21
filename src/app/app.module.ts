import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { NgsRevealModule } from 'ngx-scrollreveal';

import { NavComponent } from './navbar/nav.component';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: '', 
       component: HomeComponent,
       redirectTo: 'home',
//           pathMatch: 'full'
	     },
];
@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes,
      { enableTracing: true }) ,
    FormsModule,
    NgsRevealModule,
    NgbModule
  ],
  declarations: [AppComponent, NavComponent, HomeComponent, ProjectsComponent],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule {}
