import { Component, VERSION } from '@angular/core';
import { NgsRevealConfig } from 'ngx-scrollreveal';
import {
    Router,
    RouterEvent,
    NavigationStart,
    NavigationEnd
} from "@angular/router";

@Component({
  selector: 'mysite',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NgsRevealConfig],
})
export class AppComponent {
  isLoaded: boolean;
  constructor(private _router: Router,
                       config: NgsRevealConfig) {
    // customize default values of ngx-scrollreveal directives used by this component tree
    config.duration = 1000;
    config.easing = 'cubic-bezier(0.645, 0.045, 0.355, 1)';
  };
  ngOnInit() {
    this.routerEvents();
  }

  routerEvents() {
    this._router.events.subscribe((event: RouterEvent) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.isLoaded = true;
          break;
        }
        case event instanceof NavigationEnd: {
          this.isLoaded = false;
          break;
        }
      }
    });
  }
}
