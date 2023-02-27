import { Component, OnInit, ElementRef, Renderer2, ViewChild  } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { Post } from "../models/post";
import { Subscription } from 'rxjs';
@Component({
  selector: 'navbar',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],

})
export class NavComponent implements OnInit {
  constructor(
    private renderer: Renderer2,
    private router: Router,
    private _route: ActivatedRoute, 
              ) {  
    this.posts = [];
  }
   
  @ViewChild('navbar') fixedDiv: ElementRef;
  @ViewChild('background') underlyingElement: ElementRef;
  public isCollapsed = false;
  posts: Post[];
  public navColor;
  public navBg;
  public navBgColor;
  private routerSubscription: Subscription;
  
  ngOnInit() {
    this.posts = this._route.snapshot.data["posts"];
    // change navbar color to black if we're in projects
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.changeNavColor(this.router.url);
      }
    });
  }

  private changeNavColor(url) {
    if (url == "/projects") {
      window.scroll(0,0);
      this.navColor = "navbar-dark";
      this.navBg = "rgba(0,0,0,0.2)";
      this.navBgColor = "#000";
    }
    else {
      this.navColor = "navbar-light";
      this.navBg = "rgba(150,150,150,0.2)";
      this.navBgColor = "#fff";
    }    
  }
}
