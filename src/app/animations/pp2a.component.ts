import { AfterContentChecked, Component, Input, Inject,OnInit, NgZone, HostListener, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from "@angular/router";  
  
import { PostService } from "../services/posts.service";  
import { Post } from "../models/post";
import { AnimationOptions, LottieModule } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
import { NgsRevealService } from 'ngx-scrollreveal';
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks
} from "body-scroll-lock";

@Component({
  selector: 'pp2a-animation',
  templateUrl: './pp2a.component.html',
  styleUrls: ['pp2a.component.css', '../app.component.css']
})

export class pp2aAnimationComponent implements AfterViewInit, OnInit {
  
  options: AnimationOptions = {
    path: '../assets/animation/pp2a_animation.json',
    autoplay: false,
    loop: false,
    rendererSettings: {
      progressiveLoad: false,
        },
	        };
  private animationItem: AnimationItem;
  public animationBuffer;
  private pauseFrames = [
    0, // intro
    10,// ca
    20,// cc
    30,// cb + cb2
    70,// master
    120, // arms
    250, // network
    350,// scan result ()
    400, // wt slim channel
    450, // e198k slim channel
  ];
  private pauseDuration = 30;
  private pause = false;
  private pauseIdx = 0;
  public topOffset;
  public animationParentHeight;
  private framesPerScreen = 40;
  private afterRevealSubscription;
  private currentStickyDiv;
  private isScrollable = true;
  private prevScrollY = 0;
  private stickyCounter = 0;
  private timeout;
  constructor(
    private ngZone: NgZone,
    private postService: PostService,  
    private route: ActivatedRoute,
    private router: Router,
    private revealService: NgsRevealService
  ) {}  


  @HostListener('window:scroll', ['$event']) 
  animate(event): void {
    if (!this.isScrollable) {
      
      event.preventDefault();
    
      if (this.prevScrollY < window.scrollY) {this.stickyCounter += 1;}
      if (this.prevScrollY > window.scrollY) {this.stickyCounter -= 1;}  
    } 

    if (!this.isScrollable && (this.stickyCounter > 10 || this.stickyCounter <= -10)) {
     //   enableBodyScroll(window);
        this.isScrollable = true;
        this.stickyCounter = 0;
    }



    var maxFrames = this.animationItem.firstFrame + this.animationItem.totalFrames - 1;
    var goTo = Math.round(this.framesPerScreen * window.pageYOffset / window.innerHeight);
    var goToActual = goTo;
    if (goTo >= this.pauseFrames[0]) {
      for (let p of this.pauseFrames) {
        var idx = this.pauseFrames.indexOf(p);
        if (goTo >= p  + this.pauseDuration * (idx) && goTo <= p + this.pauseDuration * (idx+1)) {
          this.pause = true;
          goToActual = p;
          this.pauseIdx = idx;
          break;
        }
        else {
          this.pause = false;   
        }
      }
    }

    if (!this.pause && goTo > this.pauseFrames[0]) {
      for (let p of this.pauseFrames) {
        var idx = this.pauseFrames.indexOf(p);
        if (goTo > p + this.pauseDuration * (idx+1)  && goTo < this.pauseDuration * (idx+1) + this.pauseFrames[idx+1]) {
          this.pauseIdx = idx;
          break;
        }
      }
      goToActual = goTo - this.pauseDuration * (this.pauseIdx+1);
      }

    if (goToActual > maxFrames){ goToActual = maxFrames - 1;} // don't scroll past max frame
    if (goToActual == 0){ goToActual = - 1;} // show frame zero as black

    console.log(goToActual);
    this.animationItem.goToAndStop(goToActual, true); 

  }



  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
    console.log('animation loaded');
  }



  ngAfterViewInit() {
    console.log('View is being initialized');
    setTimeout(() => {
        console.log('View is fully loaded');
    }, 0);
  }
  
  userPosts: Post[] = [];  
  postObject$;   
  
  ngOnInit() {  
    this.userPosts = this.route.snapshot.data.userposts;   
    this.afterRevealSubscription = this.revealService.afterReveal$.subscribe(
      (el: HTMLElement) => {
        var scrollY = window.scrollY;
        this.currentStickyDiv = el;
        //this.currentStickyDiv.classList.add('sticky');
        console.log(`disabling scrolling'`);
        this.isScrollable = false;
        el.style.position = 'fixed';
        el.style.top = "600px";
        
       // disableBodyScroll(window);
    });
  }  
  ngOnDestroy() {
    // unsubscribe to ScrollReveal observables to prevent memory leaks
    this.afterRevealSubscription.unsubscribe();
  }
}
