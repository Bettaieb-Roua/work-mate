import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedDataService } from '../shared-data.service';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  
  taskId:number =0
  task: any = {};
  title = 'work_mate';
  tasks: any[] = [];
  sideBarOpen = true;
  comments : any[] = [];
  allComments : any[] = [];
  

 


  constructor(private router: Router, private route: ActivatedRoute, private sharedDataService: SharedDataService,private http: HttpClient) {
  }

  ngOnInit(): void {
    this.sharedDataService.currentComments.subscribe((comments) => {
      this.allComments = comments;
      
    }); 
    
    this.sharedDataService.currentTaskId.subscribe((taskId) => {
      this.taskId = taskId;  
    });  
    this.loadTaskDetails();
    
   
  }

  loadTaskDetails() {
    this.http.get<any>('http://localhost:3000/api/task/getAllTasks').subscribe(
      (response) => {
        const tasks = response.data;
        const task = tasks.find((task: { _id: number; }) => task._id === this.taskId);
        this.task=task;
        this.http.get<any>(`http://localhost:3000/api/comment/getAllComments/${this.taskId}`).subscribe(
          (commentResponse) => {
            const comments = commentResponse.data;
            this.sharedDataService.setComments(comments);
          },
          (error) => {
            console.error('Error loading comments for the task:', error);
          }
        );
        
        
      },
      (error) => {
        console.error('Error loading task details:', error);
      }
    );
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }




  goBackHome(){
    this.router.navigate(['/home']);
  }
 
}


