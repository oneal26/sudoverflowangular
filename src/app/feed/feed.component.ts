import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../services/user.services';
import { PostService } from '../services/post.services';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import User from '../models/user';
import Post from '../models/post';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})



export class FeedComponent implements OnInit {

  api_url = 'http://localhost:3000';
  userUrl = `${this.api_url}/api/users`;
  postUrl = `${this.api_url}/api/posts`;

  constructor(private userService: UserService, private postService: PostService,private http: HttpClient) { 
    
  }
  
  
  postList: any = [];
  usersList: any = [];

  ngOnInit() {
    this.userService.getUsers()
      .subscribe(users => {
        //assign the Userlist property to the proper http response
        this.usersList = users
        console.log(users)
      })

      this.postService.getPosts()
      .subscribe(posts => {
        //assign the Userlist property to the proper http response
        this.postList = posts
        console.log(posts)
      })

      
}

deleteUser(user: User) {
  this.userService.deleteUser(user._id).subscribe(res => {
    this.usersList.splice(this.usersList.indexOf(user), 1);
  })
}

deletePost(post: Post) {
  this.postService.deletePost(post._id).subscribe(res => {
    this.postList.splice(this.postList.indexOf(post), 1);
  })
}

}
