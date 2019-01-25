import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.services';
import { UserService } from '../services/user.services';
import Post from '../models/post';
import User from '../models/user';
import { Response } from '@angular/http';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  constructor(private postService: PostService, private userService: UserService) { }

  //Declaring the new User Object and initilizing it
  public newPost: Post = new Post()

  //An Empty list for the visible User list
  usersList: User[] = [];
  postList: Post[] = [];
  editPosts: Post[] = [];

  ngOnInit(): void {

    //At component initialization the 
    this.postService.getPosts()
      .subscribe(posts => {
        //assign the Userlist property to the proper http response
        this.postList = posts
        console.log(posts)
      })
  }

  create() {
    this.postService.createPost(this.newPost)
      .subscribe((res) => {
        this.postList.push(res.data)
        this.newPost = new Post()
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

    submitPost(event, Post:Post){
      if(event.click){
        this.editPost(Post)
      }
    }

    deleteUser(post: Post) {
      this.postService.deletePost(post._id).subscribe(res => {
        this.postList.splice(this.postList.indexOf(post), 1);
      })
    }

}
