import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from "./home/home.component";
import { UserComponent } from "./user/user.component";
import { FeedComponent } from "./feed/feed.component";
import { PostComponent } from "./post/post.component";
import { LoginComponent } from "./login/login.component";
import { CommentsComponent } from "./comments/comments.component";
import { ResultComponent } from "./result/result.component";

const routes: Routes = [
  { path: '', redirectTo: "/feed", pathMatch: 'full'},
  { path: 'about-us', component: HomeComponent },
  { path: 'users', component: UserComponent },
  { path: 'feed', component: FeedComponent },
  { path: 'post', component: PostComponent },
  { path: 'login', component: LoginComponent },
  { path: 'comments', component: CommentsComponent },
  { path: 'result', component: ResultComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
