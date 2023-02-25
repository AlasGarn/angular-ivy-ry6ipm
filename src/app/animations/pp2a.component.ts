import { Component, OnInit, AfterViewInit, AfterViewChecked, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ActivatedRoute } from "@angular/router";  
import { Post } from "../models/post";
import { AnimationOptions, LottieModule } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
import { trigger, state, style, animate, transition } from '@angular/animations';
import {fromEvent, Subscription} from 'rxjs';
import {tap, throttleTime} from 'rxjs/operators';
import { gsap, Power3 } from 'gsap';
import ScrollTrigger from "gsap/ScrollTrigger";



var flyInOut = trigger(
  'flyInOut', [
    state('bottom', style({ opacity: 0.0, top: '100vh', transform: "translateY(0px)" })),
    state('top', style({ opacity: 0.0, top: '0vh', transform: "translateY(0px)"  })),
    state('center', style({ opacity: 1,  top: "{{textVH}}vh", transform: "translateY(0px)" }), {params: {textVH: 50}}),

    transition('bottom => center', [
      style({ opacity: 1, }),
      animate("0.35s ease-in")
    ]),
    transition('top => center', [
      style({ opacity: 1,  }),
      animate("0.35s ease-in")
    ]),
    transition('center => top', [
      animate("0.35s ease-out", style({opacity: 0.0, transform: "translateY({{textVH}}vh)" }))
    ],{params: {textVH: 50}}),
    transition('center => bottom', [
      animate("0.35s ease-out", style({opacity: 0.0, transform: "translateY(-{{textVH}}vh)"}))
    ],{params: {textVH: 50}})

  ])

  

@Component({
  queries: {lottieContainerRef: new ViewChild( "lottieContainer" ),
            lottiePlayerRef: new ViewChild( "lottiePlayer" ),
            textRef: new ViewChild( "text" )},
  selector: 'pp2a-animation',
  templateUrl: './pp2a.component.html',
  styleUrls: ['pp2a.component.css', '../app.component.css'],
  animations: [flyInOut]
})

export class pp2aAnimationComponent implements AfterViewInit, AfterViewChecked, OnInit {
  @ViewChild('lottieContainer', { static: false }) lottieContainerRef: ElementRef;
  @ViewChild('lottiePlayer') private lottiePlayerRef: any;
  //@ViewChild('lottiePlayer', {read: ElementRef}) private lottiePlayerRef: ElementRef;


  @ViewChild('text',         { static: false }) textElementRef: ElementRef;

  options: AnimationOptions = {
    path: '../assets/animation/my_lottie.json',
    autoplay: false,
    loop: false,
    rendererSettings: {
      progressiveLoad: false,
        },
	        };
  private animationItem: AnimationItem;
  public animationBuffer;
  public pauseFrames = [
    0, // intro
    10,// ca
    20,// cc
    30,// cb + cb2
    70,// master
    120, // arms
    250, // network
    350,// scan 
    400, // separation
    410, // wt slim channel
    425, // e198k slim channel
    470, // we hope...
    510
  ];
  public pauseText = [
    "PP2A is made of 3 parts",
    "The scaffold sub-unit...",
    "The catalytic sub-unit...",
    "And a regulatory sub-unit, which can be one of several types. (In this work, we focused on B56d)",
    "PP2A is a master regulator of the cellular cycle and mutations in B56d are linked to intellectual disability and cancer.",
    "The arms of B56d can come apart to expose the active site and the SLiM binding groove",
    "The coordinated movement of PP2A forms a network, through which a disturbance at one part of the structure can reach a distant part. This phenomenon is called allostery. We were able to compute this network through molecular simulations.",
    "Several mutations were previously identified in B56d...",
    "Residues E198 and E200 are sometimes found mutated in people diagnosed with intellecual disability. In this work we compared the allosteric networks between a normal PP2A and the E198K mutant.",
    "A normal PP2A has an allosteric channel that holds the SLiM in place",
    "But, if E198 is mutated to K198, another allosteric channel is formed, which causes the C-arm to become more flexible",
    "We found that the E198K mutation can rewire the allosteric network which caused the C-arm to detach more easily. This means that the E198K mutant PP2A will be abnormally active.",
    "We hope that understanding the allostery in PP2A can help others design drugs to help patients with mutations to the B56d"
  ];
  private alreadyLoaded = false;
  public pauseDuration = 50;
  private pause = false;
  private pauseIdx = 0;
  public topOffset;
  public animationParentHeight;
  public framesPerScreen = 40;
  public maxFrames = 0;
  private animationRunning = false;
  public textPositionTop;
  public textPositionLeft;
  private lastY = 0;
  private animationReady = false;
  public placeholderHeight = 0;
  constructor(private route: ActivatedRoute) {
  }  

  private eventSub: Subscription;


  
  animate(event): void {
 
    /*
    Deal with lottie
    */
    if (!this.animationReady) {return}
    var goTo = Math.round(this.framesPerScreen * window.pageYOffset / window.innerHeight);
    var goToActual = goTo;

    // find whether we should pause
    if (goTo >= this.pauseFrames[0]) {
      for (let p of this.pauseFrames) {
        var idx = this.pauseFrames.indexOf(p);
        if (goTo >= p  + this.pauseDuration * (idx) && goTo <= p + this.pauseDuration * (idx+1)) {
          this.pause = true;
          goToActual = p;
          this.pauseIdx = idx;
          this.determineTextState();
          break;
        }
        else {
          this.pause = false;  
          this.determineTextState();
        } 
      }
    }
    // handle the initital segment before any pauses
    if (!this.pause && goTo > this.pauseFrames[0]) {
      for (let p of this.pauseFrames) {
        var idx = this.pauseFrames.indexOf(p);
        if (goTo > p + this.pauseDuration * (idx+1) && goTo < this.pauseDuration * (idx+1) + this.pauseFrames[idx+1]) {
          this.pauseIdx = idx;
          this.determineTextState();
          break;
        }
      }
      goToActual = goTo - this.pauseDuration * (this.pauseIdx+1);
    }

    if (goToActual > this.maxFrames){ goToActual = this.maxFrames - 1;} // don't scroll past max frame
    if (goToActual == 0){ goToActual = - 1;} // show frame zero as black
/*
    console.log(goToActual, 
      //"lastY", this.lastY, 
      //"currentY", window.pageYOffset, 
      "isShown", this.isShown,
      "animationRunning", this.animationRunning);*/
    this.lastY =  window.pageYOffset;
    this.animationItem.goToAndStop(goToActual, true); 
  }

  determineTextState() {
    // some logic for X positioning
    if (!this.animationRunning) {
      if (this.pauseIdx == 9) {
        this.textPositionLeft = "col-lg-1";
      }
      else {
        this.textPositionLeft = "col-lg-7";
      }
      if (this.pauseIdx > 7) {
        this.textPositionTop = 75;
      }
      else {this.textPositionTop = 45;}
    }
    // set the text position to center if we entered a pause
    if (this.pause && this.textState != "center"  && !this.animationRunning) {
      this.textState = "center";
      this.currentText = this.pauseText[this.pauseIdx]
    }
    // decide where to move the text if it's in the center, or where the next text is, if not
    if (!this.pause  && !this.animationRunning){
      switch(this.textState) { 
        case "center": { 
          if (this.lastY > window.pageYOffset) {
            this.textState = "bottom";
            break; 
          } 
          if (this.lastY < window.pageYOffset) {
            this.textState = "top";
            break; 
          }      
        } 

        default: {      
          // scrolling up -> the next text is at the top
          if (this.lastY > window.pageYOffset) {
            this.textState = "top";
            break;
          }
          // scrolling down -> the next text is at the bottom
          if (this.lastY < window.pageYOffset) { 
            this.textState = "bottom";
            break;
          }
        }
      } 
    }

  }

  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
    console.log("created");

    
  }
  animationDataReady(): void {
    this.animationReady = true;
    console.log("loaded");
    this.maxFrames = this.animationItem.firstFrame + this.animationItem.totalFrames - 1;
    this.placeholderHeight = this.maxFrames*this.framesPerScreen + this.pauseDuration*this.pauseFrames.length;
  }

  @HostListener('window:load')
  onLoad() {
    console.log("page is fully loaded");
    this.animationDataReady();
    this.alreadyLoaded = true;
  }
  ngAfterViewChecked() {
    console.log("AfterViewChecked");
    if (this.alreadyLoaded) {
      console.log("page already loaded");
      this.animationDataReady();}
  }
  ngAfterViewInit() {
    console.log("afterviewinit");
    if (this.alreadyLoaded) {
      console.log("page already loaded");
      this.animationDataReady();}
    this.textPositionTop = this.lottieContainerRef.nativeElement.getBoundingClientRect().bottom;
  }
  userPosts: Post[] = [];  
  postObject$;   
  textState = "bottom";
  currentText = this.pauseText[0]

  ngOnInit() {  
    this.userPosts = this.route.snapshot.data.userposts;  
    this.eventSub = fromEvent(window, 'scroll').pipe(
      throttleTime(16), // emits once, then ignores subsequent emissions for 16ms, repeat...
      tap(event => this.animate(event))
    ).subscribe(); 

    gsap.registerPlugin(ScrollTrigger);
    this.gsapScrollAnimations();
  }  
  ngOnDestroy() {
    this.eventSub.unsubscribe(); // don't forget to unsubscribe
  }
  animStart(event) {
    this.animationRunning = true;
  }
  
  animEnd(event) {
  //  setTimeout(() => this.animationRunning = false, 300);
    this.determineTextState();
    this.animationRunning = false
  }
  gsapScrollAnimations() {
    gsap.set('.scrollDist', {width:"100vw", height:'3000vh'})
    gsap.timeline({
      scrollTrigger:{
        trigger:'.scrollDist', 
        start:'top top', 
        end:'bottom bottom', 
        scrub: 1,
      }
    })
      .fromTo('.front', {y:0},{y:-2000, ease: "none"},0)
      .fromTo('.backdrop', {y:0},{y:-1400, ease: "none"},0)
      .fromTo('.lottie-container', {y:200},{y:210},0)
  }

  

}
