import { Response } from '@angular/http';
import { UserService } from '../services/user.services';
import User from '../models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(
    //Private Userservice will be injected into the component by Angular Dependency Injector
    private userService: UserService
  ) { }

  //Declaring the new User Object and initilizing it
  public newUser: User = new User()

  //An Empty list for the visible User list
  usersList: User[] = [];
  editUsers: User[] = [];

  ngOnInit(): void {

    //At component initialization the 
    this.userService.getUsers()
      .subscribe(users => {
        //assign the Userlist property to the proper http response
        this.usersList = users
        console.log(users)
      })
  }

  create() {
    this.userService.createUser(this.newUser)
      .subscribe((res) => {
        this.usersList.push(res.data)
        this.newUser = new User()
      })
  }


  editUser(user: User) {
    console.log(user)
     if(this.usersList.includes(user)){
      if(!this.editUsers.includes(user)){
        this.editUsers.push(user)
      }else{
        this.editUsers.splice(this.editUsers.indexOf(user), 1)
        this.userService.editUser(user).subscribe(res => {
          console.log('Update Succesful')
         }, err => {
            // this.editUser(User)
            console.error('Update Unsuccesful')
          })
        }
      }
    }

    submitUser(event, User:User){
      if(event.keyCode ==13){
        this.editUser(User)
      }
    }

    deleteUser(user: User) {
      this.userService.deleteUser(user._id).subscribe(res => {
        this.usersList.splice(this.usersList.indexOf(user), 1);
      })
    }

}
