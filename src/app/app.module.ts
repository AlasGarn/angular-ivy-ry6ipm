import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { NgsRevealModule } from 'ngx-scrollreveal';

import { NavComponent } from './navbar/nav.component';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';
import { pp2aAnimationComponent } from './animations/pp2a.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ResolverService } from "./resolvers/resolver.service";
import { HttpClientModule } from '@angular/common/http';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { LottieModule } from "ngx-lottie";
import player from "lottie-web";

import { PdfViewerModule } from 'ng2-pdf-viewer';

const routes: Routes = [
	{
            path: "home",
            component: HomeComponent,
	    resolve: { posts: ResolverService }
	},
        { path: 'projects', component: ProjectsComponent },
        { path: '', redirectTo: 'home'},
];
export function playerFactory() {
	  return player;
}
@NgModule({
  imports: [
    BrowserModule,
    PdfViewerModule,
    HttpClientModule,
    NgbModule,
    NgbCollapseModule,
    LottieModule.forRoot({ player: playerFactory }),
    RouterModule.forRoot(routes,
      { 
	scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
	scrollOffset: [0, 64]
          }) ,
    FormsModule,
    NgsRevealModule,
  ],
  declarations: [AppComponent, NavComponent, HomeComponent, ProjectsComponent, pp2aAnimationComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
