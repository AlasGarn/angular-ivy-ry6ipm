import { Component, VERSION } from '@angular/core';
import { NgsRevealConfig } from 'ngx-scrollreveal';

@Component({
  selector: 'mysite',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NgsRevealConfig],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  constructor(config: NgsRevealConfig) {
    // customize default values of ngx-scrollreveal directives used by this component tree
    config.duration = 1000;
    config.easing = 'cubic-bezier(0.645, 0.045, 0.355, 1)';

    //other options here
  }
}
