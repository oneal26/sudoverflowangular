import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../services/user.services';
import { PostService } from '../services/post.services';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import User from '../models/user';
import Post from '../models/post';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  
  

  api_url = 'http://localhost:3000';
  userUrl = `${this.api_url}/api/users`;
  postUrl = `${this.api_url}/api/posts`;

  constructor(private userService: UserService, private postService: PostService,private http: HttpClient) { 
  }
  
  
  postList: any = [];
  usersList: any = [];
  editPosts: Post[] = [];

  ngOnInit() {
    this.refresh()
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

refresh(){
  if( window.localStorage ){
    if( !localStorage.getItem('firstLoad') ){
      localStorage['firstLoad'] = true;
      window.location.reload();
    }else{
      localStorage.removeItem('firstLoad');
      }
    }
  console.log("Refreshed.")
}

addComment(post: Post, comment: Post){
  
  post.comments.push(comment)
  this.postService.editPost(post).subscribe(res => {
    console.log('Update Succesful')
  }, err => {
    console.error('Update Unsuccesful')
  })
}

upVote(post: Post){
  post.vote += 1
  this.postService.editPost(post).subscribe(res => {
    console.log('Update Succesful')
  }, err => {
    console.error('Update Unsuccesful')
  })
}

downVote(post: Post){
  post.vote -= 1
  this.postService.editPost(post).subscribe(res => {
    console.log('Update Succesful')
  }, err => {
    console.error('Update Unsuccesful')
  })
}


deleteUser(user: User) {


  this.userService.deleteUser(user._id).subscribe(res => {
    this.usersList.splice(this.usersList.indexOf(user), 1);
  })
}


deletePost(post: Post, check: Boolean) {
  check = confirm("Are you sure you want to delete this post?")
  if(check == true){
  this.postService.deletePost(post._id).subscribe(res => {
    this.postList.splice(this.postList.indexOf(post), 1);
  })}else{
    console.log("User Chose to cancel")
  }
}

editPost(post: Post) {
  console.log(post)
   if(this.postList.includes(post)){
    if(!this.editPosts.includes(post)){
      this.editPosts.push(post)
    }else{
      this.editPosts.splice(this.editPosts.indexOf(post), 1)
      this.postService.editPost(post).subscribe(res => {
        console.log('Update Succesful')
       }, err => {
          // this.editUser(User)
          console.error('Update Unsuccesful')
        })
      }
    }
  }
  


}
