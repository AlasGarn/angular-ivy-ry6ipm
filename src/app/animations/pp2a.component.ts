import { AfterViewInit, OnInit, Component, Input, Inject, NgZone, HostListener } from '@angular/core';
import { AnimationOptions, LottieModule } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';

import {
    Router,
    RouterEvent,
    Event,
    NavigationStart,
    NavigationEnd
} from "@angular/router";
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { LoadingService } from '../services/loader.service';

@Component({
  selector: 'pp2a-animation',
  templateUrl: './pp2a.component.html',
  styleUrls: ['pp2a.component.css', '../app.component.css']
})

export class pp2aAnimationComponent {
  loading$ = this.loader.loading$;
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

  constructor(
    private ngZone: NgZone,
    private router: Router,
    @Inject(LoadingService) public loader: LoadingService,
  ) {}  

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
    console.log('animation loaded')
  }


  ngAfterViewInit() {
    console.log('element loaded')
  }
}
