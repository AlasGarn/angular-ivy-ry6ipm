import { Component, OnInit, HostListener, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";  
import { Post } from "../models/post";


@Component({
  selector: 'test',
  templateUrl: './test.component.html',
  styleUrls: ['test.component.css']
})

export class TestComponent implements AfterViewInit, OnInit {
  
  
  constructor(private route: ActivatedRoute) {}  

  @HostListener('window:scroll', ['$event']) 
  animate(event): void {}

  

  ngAfterViewInit() {
  }
  userPosts: Post[] = [];  
     
  
  ngOnInit() {  
    this.userPosts = this.route.snapshot.data.userposts;   
   }  
  ngOnDestroy() {}
}
