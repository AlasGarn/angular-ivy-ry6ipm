import { AfterViewInit, Component, Input, NgZone, HostListener } from '@angular/core';
import { AnimationOptions, LottieModule } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';

@Component({
  selector: 'pp2a-animation',
  templateUrl: './pp2a.component.html',
  styles: []
})

export class pp2aAnimationComponent {
  options: AnimationOptions = {
    path: '../assets/animation/test.json',
    autoplay: false,
    loop: false,
	        };
  private animationItem: AnimationItem;
  public animationBuffer;
  public topOffset;
  public animationParentHeight;

  constructor(private ngZone: NgZone) {}  

  @HostListener('window:scroll', ['$event']) 
  animate(event): void {
    var maxFrames = this.animationItem.firstFrame + this.animationItem.totalFrames - 1;
    var scrollPerFrame = (this.animationBuffer - window.innerHeight / 1 ) / this.animationItem.totalFrames;
    var goTo = Math.round(window.pageYOffset) / scrollPerFrame;
    if (goTo > maxFrames){ goTo = maxFrames };
    this.animationItem.goToAndStop(goTo, true);
  }

  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
    this.animationBuffer = this.animationBuffer;
  }


  ngAfterViewInit() {
    this.animationBuffer = 2*window.innerHeight;
    this.animationParentHeight = window.innerHeight;
  }
}
