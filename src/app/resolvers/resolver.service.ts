import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";

import { PostService } from "../services/posts.service";


import { Observable } from "rxjs";  
import { Post } from "../models/post";  
  
@Injectable({providedIn: "root"})  
export class ResolverService implements Resolve<Post[]> {  
  constructor(private postService: PostService) {}  
  
  resolve(route: ActivatedRouteSnapshot): Observable<Post[]> {  
    return this.postService.getPosts();  
  }  
}  

/*
@Injectable({
	  providedIn: "root"
})
export class ResolverService implements Resolve<any> {
   constructor(private _postsService: PostsService) {}

   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
         console.log('Called route in resolver...', route);

	   return this._postsService.getPostList();
       	  }
}*/
