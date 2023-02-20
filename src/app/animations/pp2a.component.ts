import { AfterContentChecked, Component, Input, Inject,OnInit, NgZone, HostListener, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";  
  
import { PostService } from "../services/posts.service";  
import { Post } from "../models/post";
import { AnimationOptions, LottieModule } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';


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
  private pauseFrames = [60,90,120];
  private pauseDuration = 30;
  private pauseDebt = 0;
  private pauseOffset = 0;
  private pause = false;
  private pauseFrame = 0;
  public topOffset;
  public animationParentHeight;


  constructor(
    private ngZone: NgZone,
    private postService: PostService,  
    private route: ActivatedRoute  
  ) {}  



  @HostListener('window:scroll', ['$event']) 
  animate(event): void {
    var maxFrames = this.animationItem.firstFrame + this.animationItem.totalFrames - 1;
    var framesPerScreen = 60;
    var goTo = Math.round(framesPerScreen * window.pageYOffset / window.innerHeight);
    console.log("goto",goTo);
    /* find which frame we're paused on */
    for (let p of this.pauseFrames) {
        if (goTo < p) { 
          /* pauseOffset is for the accumulated debt, regardless of the pause state */
          this.pauseOffset = this.pauseDuration * (this.pauseFrames.indexOf(p) - 1);
        }
    }
    if (goTo < this.pauseFrames[0]) {this.pauseOffset = 0;}
    console.log("pause offset changed to", this.pauseOffset);


    /* if we're directly on a pause frame */
    if (this.pauseFrames.includes(goTo) && this.pauseDebt < this.pauseDuration) {
      this.pause = true;
      this.pauseFrame = goTo;
      console.log("hit pause");}
    /* increase debt if in pause */
    if (this.pause == true) {
      this.pauseDebt = goTo - this.pauseFrame;
      console.log("increasing debt", this.pauseDebt);
    }

    /* if we're beyond or above the pause */
    if ((this.pause == true && this.pauseDebt >= this.pauseDuration) || this.pauseDebt < 0) {
      this.pause = false; 
      this.pauseDebt = 0;
      console.log("moving out of pause");
    }
    
    if (goTo > maxFrames){ goTo  = maxFrames - 1;}
    console.log("moving on to", goTo - this.pauseDebt - this.pauseOffset);
    this.animationItem.goToAndStop(goTo - this.pauseDebt - this.pauseOffset, true); 
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
  }  
}
