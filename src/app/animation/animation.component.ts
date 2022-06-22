import { Component, Input } from '@angular/core';
import { LottieModule } from 'ngx-lottie';
import { AnimationOptions } from 'ngx-lottie';


@Component({
  selector: 'animation',
  templateUrl: './animation.component.html',
  styles: []
})

export class AnimationComponent  {
  options: AnimationOptions = {
    path: '../assets/animations/animation.json',
    renderer: 'svg',
    autoplay: true,
    loop: false,
	        };
 
}
