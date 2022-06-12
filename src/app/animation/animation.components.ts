import { Component, Input } from '@angular/core';
import { LottieOptions, AnimationItem } from 'ngx-lottie';

@Component({
  selector: 'app-headeranimation',
  template: `<ng-lottie
      [options]="options"
      (animationCreated)="animationCreated($event)"
    ></ng-lottie>`,
  styles: []
})

export class HeaderanimationComponent  {

  public options: LottieOptions = {
    path: '../assets/animations/headeranimation.json',
    renderer: 'svg',
    autoplay: true,
    loop: false,
    autoloadSegments: true,
  };
 
  public animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }
}