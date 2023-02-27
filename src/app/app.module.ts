import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';

import { NavComponent } from './navbar/nav.component';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';
import { pp2aAnimationComponent } from './animations/pp2a.component';
import { NgbModule,NgbCollapseModule  } from '@ng-bootstrap/ng-bootstrap';
import { ResolverService } from "./resolvers/resolver.service";
import { LottieModule } from "ngx-lottie";
import player from "lottie-web";
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NetworkInterceptor } from './network.interceptor';
import { SpinnerComponent } from './spinner/spinner.component';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ParallaxDirective } from './parallax.directive';
import { ParallaxGsapDirective } from './parallax-gsap.directive';

const routes: Routes = [
	{
            path: "home",
            component: HomeComponent,
	    resolve: { posts: ResolverService }
	},
        { path: 'projects', 
          component: ProjectsComponent, 
	  resolve: { posts: ResolverService }
        } ,
        { path: 'pp2a', 
          component: pp2aAnimationComponent, 
    resolve: { posts: ResolverService }
        } ,
        { path: 'test', 
          component: TestComponent, 
	  resolve: { posts: ResolverService }
        } ,
        { path: '', redirectTo: 'home'},
];
//export function playerFactory() {return player;}
@NgModule({
  imports: [
    BrowserModule,
    PdfViewerModule,
    HttpClientModule,
    NgbModule,
    NgbCollapseModule,
    LottieModule.forRoot({ player: () => player }),
    //LottieModule.forRoot({ player: playerFactory }),
    RouterModule.forRoot(routes,
      { 
	      scrollPositionRestoration: 'disabled',
        anchorScrolling: 'enabled',
	      scrollOffset: [0, 64]
          }),
    FormsModule,
    BrowserAnimationsModule,
  ],
  declarations: [
    AppComponent, 
    NavComponent, 
    HomeComponent, 
    ProjectsComponent, 
    pp2aAnimationComponent, 
    SpinnerComponent,
    TestComponent,
    ParallaxDirective,
    ParallaxGsapDirective
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}, /* need to reload with hash */
    {provide: HTTP_INTERCEPTORS, useClass: NetworkInterceptor, multi: true},
],
  bootstrap: [AppComponent],
})
export class AppModule {}
