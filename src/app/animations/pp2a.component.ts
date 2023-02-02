import { AfterViewInit, Component, Input, NgZone, HostListener } from '@angular/core';
import { AnimationOptions, LottieModule } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';

@Component({
  selector: 'pp2a-animation',
  templateUrl: './pp2a.component.html',
  styleUrls: ['pp2a.component.css', '../app.component.css']
})

export class pp2aAnimationComponent {
  options: AnimationOptions = {
    path: '../assets/animation/pp2a_animation_tiny.json',
    autoplay: false,
    loop: false,
    rendererSettings: {
      progressiveLoad: true,
        },
	        };
  private animationItem: AnimationItem;
  public animationBuffer;
  public topOffset;
  public animationParentHeight;

  constructor(private ngZone: NgZone) {}  

  @HostListener('window:scroll', ['$event']) 
  animate(event): void {
    var maxFrames = this.animationItem.firstFrame + this.animationItem.totalFrames - 1;
    var framesPerScreen = 60;
    var goTo = framesPerScreen * Math.round(window.pageYOffset) / window.innerHeight;
    if (goTo > maxFrames){ goTo = maxFrames - 1 };
    this.animationItem.goToAndStop(goTo, true);
  }

  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
  }


  ngAfterViewInit() {
    console.log('element loaded')
  }
}
