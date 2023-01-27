import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { PostsService } from "../services/posts.service";

@Injectable({
	  providedIn: "root"
})
export class ResolverService implements Resolve<any> {
   constructor(private _postsService: PostsService) {}

   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
         console.log('Called route in resolver...', route);

	   return this._postsService.getPostList();
       	  }
}
