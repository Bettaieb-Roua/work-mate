import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedDataService } from '../shared-data.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.css']
})
export class DeleteTaskComponent implements OnInit {
  
  taskId:number =0
  title = 'work_mate';
  sideBarOpen = true;
 
  

  constructor(private router: Router, private route: ActivatedRoute, private sharedDataService: SharedDataService,private http: HttpClient) {
  }

  ngOnInit(): void {
    this.sharedDataService.currentTaskId.subscribe((taskId) => {
      this.taskId = taskId;
    });   
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }



  deleteTask() {
  
    this.http
      .delete(`http://localhost:3000/api/task/delete/${this.taskId}`)
      .subscribe(
        (response) => {
          console.log('Task deleted');
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error('Error when deleting a task:', error);
        }
      );
  }

  goBackHome(){
    this.router.navigate(['/home']);
  }
 
}

