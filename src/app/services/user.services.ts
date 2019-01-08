import User from '../models/user';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Response} from '@angular/http';
import { Injectable } from '@angular/core';
import Post from '../models/post';

import { map } from 'rxjs/operators';

@Injectable()
export class UserService {

  api_url = 'http://localhost:3000';
  userUrl = `${this.api_url}/api/users`;
  postUrl = `${this.api_url}/api/posts`

  constructor(private http: HttpClient) {}


  createUser(user: User): Observable<any>{
    //returns the observable of http post request 
    return this.http.post(`${this.userUrl}`, user);
  }

  createPost(post: Post): Observable<any>{
    //returns the observable of http post request 
    return this.http.post(`${this.postUrl}`, post);
  }

  getUsers(): Observable<User[]>{
    return this.http.get(this.userUrl)
    .pipe(map(res  => {
      //Maps the response object sent from the server
        
      return res["data"].docs as User[];
    }))
  }

  editUser(user:User){
    let editUrl = `${this.userUrl}`
    //returns the observable of http put request 
    return this.http.put(editUrl, user);
  }

  deleteUser(id:string):any{
    //Delete the object by the id
    let deleteUrl = `${this.userUrl}/${id}`
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

