import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";  
import { Post } from "../models/post";
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { fromEvent, Subscription } from 'rxjs';
import { tap, throttleTime, filter } from 'rxjs/operators';
import { gsap } from 'gsap';
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


  // fade intro text
  var fade = trigger("fade", [
    transition(':enter', [
      style({ opacity: 0 }),
      animate(1000, style({ opacity: 1 }))
    ]),
    transition(':leave', [
      style({ opacity: 1 }),
      animate(1000, style({ opacity: 0 }))
    ])]
  )

@Component({
  queries: {lottieContainerRef: new ViewChild( "lottieContainer" ),
            lottiePlayerRef: new ViewChild( "lottiePlayer" ),
            textRef: new ViewChild( "text" )},
  selector: 'pp2a-animation',
  templateUrl: './pp2a.component.html',
  styleUrls: ['../app.component.css', 'pp2a.component.css', ],
  animations: [flyInOut, fade]
})

export class pp2aAnimationComponent implements AfterViewInit, OnInit {
  @ViewChild('lottieContainer', { static: false }) lottieContainerRef: ElementRef;
  @ViewChild('text', { static: false }) textElementRef: ElementRef;
  loadingAnimationOptions: AnimationOptions = {
    path: '../assets/animation/loading.json',
    autoplay: true,
    loop: true,
	};

  options: AnimationOptions = {
    path: '../assets/animation/my_lottie.json',
    autoplay: false,
    loop: false,
    rendererSettings: {
      progressiveLoad: false,
        },
	};
  slimActiveSiteAnimationOptions: AnimationOptions = {
    path: '../assets/animation/pointer.json',
    autoplay: true,
    loop: false,
    rendererSettings: {
      progressiveLoad: false,
        },
	};
  private animationItem: AnimationItem;
  public animationBuffer;
  public pauseFrames = [
    0, // intro
    11,// ca
    21,// cc
    31,// cb + cb2
    71,// master
    121, // arms
    248, // network
    351,// scan 
    391, // residues are sometimes mutated 
    416, //  wt slim channel
    422, // e198k slim channel ; 
    480, // this means (after rotate)
    510, //we hope...
    520 // ps
  ];
  public pauseText = [
    [["PP2A is made of 3 parts"]],
    [["The scaffold subunit..."]],
    [["The catalytic subunit..."]],
    [["And a regulatory subunit, which can be one of several types."], 
      ["(In this work, we studied the one called B56d)"]
    ],
    [["Together they form an enzyme that removes a phosphate modification from other proteins."], 
      ["PP2A is called a master regulator of the cellular cycle because it is a critical counterweight to the kinases, which add the phosphate modification."],
      ["Mutations in B56d are linked to intellectual disability and cancer."]
    ],
    [["The arms of B56d can come apart to expose the active site and the SLiM binding groove"]],
    [["The coordinated movement of PP2A forms a network, through which a disturbance at one part of the structure can reach a distant part."],
      ["This phenomenon is called allostery."],
      ["We were able to investigate this network through molecular simulations."]
    ],
    [["Several mutations were previously identified in B56d..."]],
    [["Residues E198 and E200 are sometimes found mutated in people diagnosed with intellecual disability."],
      ["In this work we compared the allosteric networks between a normal PP2A and the E198K mutant."]
    ],
    [["A normal PP2A has an allosteric channel that holds the SLiM in place"]],
    [["But, if E198 is mutated to K198, another allosteric channel is formed which causes the C-arm to become more flexible"]],
    [["This mutated allosteric channel makes the C-arm detach more easily."], 
      ["This means that the E198K mutant PP2A will be abnormally active."]
    ],
    [["We hope that understanding the allostery in PP2A can help design drugs to help patients with mutations to the B56d"]],
    [["I computed the allosteric networks shown here based on physics-based simulations, which fit very well with lab experiments by Yongna Xing and her lab. See all the details of this work in our upcoming JCP paper (I'll add a link here once it's online)"]]

  ];
  public pauseDuration = 50; // frames
  private pause = false;
  private pauseIdx = 0;
  public topOffset;
  public animationParentHeight;
  public framesPerScreen = 40;
  public maxFrames = 0;
  private animationRunning = false;
  public textPositionTop;
  public textPositionLeft;
  public textPositionRight;
  public textContainerClasses;
  public slimActiveSiteAnimationGo;
  public mutationSitesAnimationGo;
  public mutantsSeparated = false;
  private lastY = 0;
  public animationReady = false;
  public placeholderHeight = 0;
  constructor(private route: ActivatedRoute, private router: Router) {}  
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
          this.determinePointerStates();
          break;
        }
        else {
          this.pause = false;  
          this.determineTextState();
          this.determinePointerStates();

          // remove pointers and labels outside of pause
          this.mutationSitesAnimationGo = false;
          this.slimActiveSiteAnimationGo = false;
          this.mutantsSeparated = false;
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
/*
    console.log(goToActual, 
      //"lastY", this.lastY, 
      //"currentY", window.pageYOffset, 
      "isShown", this.isShown,
      "animationRunning", this.animationRunning);*/
    this.lastY =  window.pageYOffset;
    this.animationItem.goToAndStop(goToActual, true); 
  }
  determinePointerStates() {
    switch(this.pauseIdx){
      case 5: {
        this.slimActiveSiteAnimationGo = true;
        break;
      }
      case 7: {
        this.mutationSitesAnimationGo = true;
        break;
      }
      case 8: {
        this.mutantsSeparated = true; // to show WT/Mutant label
        break;
      }
    }
  }
  determineTextState() {
    // some logic for X positioning
    if (!this.animationRunning) {
      switch(this.pauseIdx){

        case 8: {
          this.textPositionLeft = "col-lg-0";
          this.textContainerClasses = "justify-content-around";
          this.textPositionTop = 75;
          break;
        }
        case 9: {
          this.textPositionLeft = "col-lg-0";
          this.textPositionTop = 75;
          this.textPositionRight = "col-lg-1"
          this.textContainerClasses = "justify-content-around";
          break;
        }
        case 10: {
          this.textPositionLeft = "col-lg-1";
          this.textPositionTop = 75;
          this.textPositionRight = "col-lg-0"
          this.textContainerClasses = "justify-content-around";
          break;
        }
        case 12: {
          this.textPositionLeft = "col-lg-0";
          this.textPositionTop = 75;
          this.textPositionRight = "col-lg-0"
          this.textContainerClasses = "justify-content-around";
          break;
        }
        default: {
            this.textPositionTop = 45;
            this.textPositionLeft = "col-lg-8";
            if (this.pauseIdx > 7) {
              this.textPositionTop = 75;
            }
        }
      }
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
  }

  animationDataReady(): void {
    this.animationReady = true;
    this.maxFrames = this.animationItem.firstFrame + this.animationItem.totalFrames - 1;
    this.placeholderHeight =  window.innerHeight/this.framesPerScreen * (this.maxFrames + this.pauseDuration*this.pauseFrames.length - 1) ;
    console.log("animation data loaded");
  }

  ngAfterViewInit() {
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
      .fromTo('.back',  {y:0},{y:-1400, ease: "none"},0)
  }

  

}
