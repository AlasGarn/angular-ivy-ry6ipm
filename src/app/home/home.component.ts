import { Component, NgModule, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Post } from "../models/post";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['../app.component.css', './home.component.css', ],
})

export class HomeComponent implements OnInit {
  posts: Post[];
  
  constructor(private _route: ActivatedRoute) {
    this.posts = [];
  }

  ngOnInit() {
    this.posts = this._route.snapshot.data["posts"];
  }
}
