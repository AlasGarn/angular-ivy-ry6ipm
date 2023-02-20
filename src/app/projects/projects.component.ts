import { Component } from '@angular/core';
import { pp2aAnimationComponent } from '../animations/pp2a.component';
import { Router, ActivatedRoute } from "@angular/router";
import { Post } from "../models/post";

@Component({
  selector: 'projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent {

  posts: Post[];
  
  constructor(private _route: ActivatedRoute) {
    this.posts = [];
  }

  ngOnInit() {
    this.posts = this._route.snapshot.data["posts"];
  }
}
