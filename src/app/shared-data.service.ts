import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  // string username
  private usernameSource = new BehaviorSubject<string>('');
  currentUsername = this.usernameSource.asObservable();

  setUsername(username: string) {
    this.usernameSource.next(username);
  }

  //number taskId
  private taskIdSource = new BehaviorSubject<number>(0);
  currentTaskId = this.taskIdSource.asObservable();

  setTaskId(taskId: number) {
    this.taskIdSource.next(taskId);
  }

  //object users
  
  private usersSource = new BehaviorSubject<any>([]); 
  currentUsers = this.usersSource.asObservable();

  setUsers(users: any) {
    this.usersSource.next(users);
  }
  //object tasks

private tasksSource = new BehaviorSubject<any>([]); 
  currentTasks = this.tasksSource.asObservable();

  setTasks(tasks: any) {
    this.tasksSource.next(tasks);
  }


  //object comments
  private commentsSource = new BehaviorSubject<any>([]); 
  currentComments = this.commentsSource.asObservable();

  setComments(comments: any) {
    this.commentsSource.next(comments);
  }

  getCurrentComments() {
    return this.commentsSource.value;
  }

  constructor() { }
}
