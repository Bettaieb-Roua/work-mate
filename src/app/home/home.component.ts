import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedDataService } from '../shared-data.service';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  username: string = '';
  title = 'work_mate';
  sideBarOpen = true;
  tasks: any[] = [];
  displayedColumns: string[] = ['_id', 'title', 'status', 'assigned_to'];
  dataSource = new MatTableDataSource<any>(this.tasks);

  constructor(private router: Router, private route: ActivatedRoute, private sharedDataService: SharedDataService,private http: HttpClient) {
  }

  ngOnInit(): void {
    this.sharedDataService.currentUsername.subscribe((username) => {
      this.username = username;
    });
  
    this.sharedDataService.currentTasks.subscribe((tasks) => {
      this.tasks = tasks;
      this.dataSource.data = this.tasks;
    });
  
    this.loadTasks();
  }
  getProfileUsername() {
    return this.username ? this.username : 'DefaultUsername';
  }

  loadTasks() {
    this.http.get<any>('http://localhost:3000/api/task/getAllTasks').subscribe(
      (response) => {
        const tasks = response.data;
        this.sharedDataService.setTasks(tasks);
        console.log('Tasks loaded:', tasks);
      },
      (error) => {
        console.error('Error loading tasks:', error);
      }
    );
  }
  

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  updateTask(taskId: number) {
    console.log('Update task with ID:', taskId);
    this.sharedDataService.setTaskId(taskId);

    this.router.navigate([`/updateTask`]);
  }

  deleteTask(taskId: number) {
    console.log('Delete task with ID:', taskId);
    this.sharedDataService.setTaskId(taskId);
    this.router.navigate([`/deleteTask`]);
  }

  addTask() {
    this.router.navigate([`/addTask`]);
  }
  addComment(taskId: number){
    this.router.navigate([`/addComment`]);
    this.sharedDataService.setTaskId(taskId);
  }
  viewTaskDetails(taskId:number){
    console.log('View task with ID:', taskId);
    this.sharedDataService.setTaskId(taskId);
    this.router.navigate(['/taskDetails']);
  }
  

}
