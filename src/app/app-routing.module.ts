import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TaskComponent } from './task/task.component';
import { UpdateTaskComponent } from './update-task/update-task.component';
import { DeleteTaskComponent } from './delete-task/delete-task.component';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { TaskDetailsComponent } from './task-details/task-details.component';


const routes: Routes = [
  {path:'signup',component:SignupComponent},
  {path:'login',component:LoginComponent},
  { path: '', redirectTo: 'signup', pathMatch: 'full' },
  {path:'home',component:HomeComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'addTask', component:TaskComponent},
  {path:'updateTask', component:UpdateTaskComponent},
  {path:'deleteTask', component:DeleteTaskComponent},
  {path:'addComment',component:AddCommentComponent},
  {path:'taskDetails',component:TaskDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
