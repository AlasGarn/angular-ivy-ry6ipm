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
  private pauseFrames = [100,150,200];
  private currentPauseFrame = 0;
  private previousPauseFrame = 0;
  private pauseDuration = 100;
  private pauseDebt = 0;
  private pause = false;
  public topOffset;
  public animationParentHeight;
  private goToActual = 0;
  private framesPerScreen = 30;
  private changePause = false;
  constructor(
    private ngZone: NgZone,
    private postService: PostService,  
    private route: ActivatedRoute  
  ) {}  



  @HostListener('window:scroll', ['$event']) 
  animate(event): void {
    var maxFrames = this.animationItem.firstFrame + this.animationItem.totalFrames - 1;
    var goTo = Math.round(this.framesPerScreen * window.pageYOffset / window.innerHeight);


    /* find which frame we're paused on */
    for (let p of this.pauseFrames) {
      var idx = this.pauseFrames.indexOf(p);
      if (this.goToActual < p) { // find the first pause that we're behind of 
        break;
      }
      this.currentPauseFrame = p; 
    }

    /*if we're above all pauses */
    if (this.goToActual < this.pauseFrames[0]) {
      this.currentPauseFrame = 0; 
    }

    /* if pause offset changed, we're either in next pause or moved above prev pause */
    if (this.previousPauseFrame < this.currentPauseFrame) {
      this.pause = true;
      console.log(
        "previous pause frame", this.previousPauseFrame,
        "pause frame changed to", this.currentPauseFrame,
        "pause status", this.pause
        );
      this.previousPauseFrame = this.currentPauseFrame;
    } 
    if (goTo < this.pauseDuration * this.pauseFrames.indexOf(this.currentPauseFrame)) {
      this.pause = true;
      console.log("pause underflow");
    }
    /* gradually increase debt if in pause */
    if (this.pause == true) {
      this.pauseDebt = goTo - this.currentPauseFrame ;
      console.log("changing debt to", this.pauseDebt);
    }

    // pause overflow  
    if (this.pause && 
      this.pauseDebt > // overflow
      this.pauseDuration * (this.pauseFrames.indexOf(this.currentPauseFrame)+1))
      {
        this.pause = false;
        this.pauseDebt = this.pauseDuration * (
          this.pauseFrames.indexOf(this.currentPauseFrame)+1);
        console.log(
          "pause overflow down"
          );
      } 

    // pause overflow up 
    if (this.pause && 
      this.pauseDebt < // overflow
      this.pauseDuration * (this.pauseFrames.indexOf(this.currentPauseFrame)))
      {
        this.pause = false;
        this.pauseDebt = this.pauseDuration * (
          this.pauseFrames.indexOf(this.currentPauseFrame));
        this.currentPauseFrame = this.pauseFrames[this.pauseFrames.indexOf(this.currentPauseFrame) - 1];

        console.log(
          "pause overflow up, cuurent pause frame changed to", this.currentPauseFrame, "debt", this.pauseDebt
          );
      } 
   /* this.goToActual = goTo - this.pauseDebt; // updated to take previous/current pause into account
    // return into pause from below  
    if (this.goToActual < this.currentPauseFrame)
    {
      this.pause = true;
      this.pauseDebt = this.pauseDuration * (this.pauseFrames.indexOf(this.currentPauseFrame)+1);
      this.goToActual= this.currentPauseFrame;
      console.log(
        "pause underflow; pause debt now", this.pauseDebt
        );
    } */

    
    console.log("goto", goTo, "actual", this.goToActual, "debt", this.pauseDebt);

    if (this.goToActual > maxFrames){ this.goToActual = maxFrames - 1;} // don't scroll past max frame
    this.animationItem.goToAndStop(this.goToActual, true); 
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
