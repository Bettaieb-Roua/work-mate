import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../shared-data.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {
  task_form: any;
  users: any[] = [];
  tasks: any[] = [];

  constructor(
    private sharedDataService: SharedDataService,
    private http: HttpClient,
    private formbuilder: FormBuilder,
    private router: Router
  ) {
    this.task_form = this.formbuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      due_date: ['', Validators.required],
      status: ['', [Validators.required]],
      category: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      assigned_to: ['', [Validators.required]],
      files: ['', [Validators.required]],
    });
  }
  title = 'work_mate';
  sideBarOpen = true;
  taskId:number =0

  ngOnInit(): void {
    this.sharedDataService.currentUsers.subscribe((users) => {
      this.users = users;
    });
    this.sharedDataService.currentTaskId.subscribe((taskId) => {
      this.taskId = taskId;
    });
    

    this.loadUsers();
  }

  loadUsers() {
    this.http
      .get<any>('http://localhost:3000/api/auth/getAllUsers')
      .subscribe(
        (response) => {
          const users = response.data;
          this.sharedDataService.setUsers(users);
          console.log(users);
        },
        (error) => {
          console.error('Error import users:', error);
        }
      );
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  submit() {
    if (this.task_form.valid) {
      console.log(this.task_form.value);

      this.http
        .put(`http://localhost:3000/api/task/update/${this.taskId}`, this.task_form.value)
        .pipe(
          switchMap(() =>
            this.http.get<any>('http://localhost:3000/api/task/getAllTasks')
          )
        )
        .subscribe(
          (response) => {
            const tasks = response.data;
            this.sharedDataService.currentTasks.subscribe((tasks) => {
              this.tasks = tasks;
            });
            this.sharedDataService.setTasks(tasks);
            console.log('Task updated and tasks loaded:', tasks);
            this.router.navigate(['/home']);
          },
          (error) => {
            console.error('Error when updating a task:', error);
          }
        );
    }
  }
}

