import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Post } from "../models/post";
import { Observable } from "rxjs";  


@Injectable({
	  providedIn: "root"
})
export class PostService {  
  private url = "http://jsonplaceholder.typicode.com/posts";  
  
  constructor(private http: HttpClient) {}  
  
  getPosts(): Observable<Post[]> {  
    return this.http.get<Post[]>(this.url).pipe();  
  }  
}  


/*export class PostsService {
  constructor(private _http: HttpClient) {}

  getPostList() {
  let url  = "https://jsonplaceholder.typicode.com/posts";
  return this._http.get<Post[]>(this.url);
                }
}*/
