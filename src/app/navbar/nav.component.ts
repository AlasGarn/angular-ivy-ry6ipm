import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Post } from "../models/post";

@Component({
  selector: 'navbar',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],

})
export class NavComponent implements OnInit {
  public isCollapsed = false;
  posts: Post[];

  constructor(private _route: ActivatedRoute, 
              ) {  
    this.posts = [];
  }

  ngOnInit() {
    this.posts = this._route.snapshot.data["posts"];
  }
}
