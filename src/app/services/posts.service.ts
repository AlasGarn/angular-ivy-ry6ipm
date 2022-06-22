import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Post } from "../models/post";


@Injectable({
	  providedIn: "root"
})
export class PostsService {
  constructor(private _http: HttpClient) {}

  getPostList() {
  let URL = "https://jsonplaceholder.typicode.com/posts";
  return this._http.get<Post[]>(URL);
                }
}
