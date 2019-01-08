import Post from '../models/post';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Response} from '@angular/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

@Injectable()
export class PostService {

  api_url = 'http://localhost:3000';
  postUrl = `${this.api_url}/api/posts`;

  constructor(private http: HttpClient) {}


  createPost(post: Post): Observable<any>{
    //returns the observable of http post request 
    return this.http.post(`${this.postUrl}`, post);
  }

  getPosts(): Observable<Post[]>{
    return this.http.get(this.postUrl)
    .pipe(map(res  => {
      //Maps the response object sent from the server
        
      return res["data"].docs as Post[];
    }))
  }

  editPost(post:Post){
    let editUrl = `${this.postUrl}`
    //returns the observable of http put request 
    return this.http.put(editUrl, post);
  }

  deletePost(id:string):any{
    //Delete the object by the id
    let deleteUrl = `${this.postUrl}/${id}`
    return this.http.delete(deleteUrl)
    .pipe(map(res  => {
      return res;
    }))
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); 
    // for demo purposes only
    return Promise.reject(error.message || error);
  }
}

