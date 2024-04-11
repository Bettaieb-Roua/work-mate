import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedDataService } from '../shared-data.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {

  taskId:number =0
  title = 'work_mate';
  sideBarOpen = true;
  comment_form: any;
  comments : any[] = [];
  

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sharedDataService: SharedDataService,
    private http: HttpClient,
    private formbuilder: FormBuilder
  ) {
    this.comment_form = this.formbuilder.group({
      comment: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.sharedDataService.currentTaskId.subscribe((taskId) => {
      this.taskId = taskId;  
    });
   
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  addComment() {
    if (this.comment_form.valid) {
      this.http.post<any>('http://localhost:3000/api/comment/createComment', this.comment_form.value)
      .pipe(
        switchMap(() =>
          this.http.get<any>(`http://localhost:3000/api/comment/getAllComments/${this.taskId}`)
        )
      )
      .subscribe(
        (response) => {
          const comments = response.data;
          this.sharedDataService.currentComments.subscribe((comments) => {
            this.comments = comments;
          });
          this.sharedDataService.setComments(comments);
          console.log('Comment added and comments loaded:', comments);
          const newComment = { user: 'Current User', comment: this.comment_form.value.comment, createdAt: new Date() };
          this.comments.push(newComment);
          this.sharedDataService.setTaskId(this.taskId);
          this.router.navigate(['/taskDetails']);
        },
        (error) => {
          console.error('Error when creating a comment:', error);
        }
      );
  }
  }

  goBackHome() {
    this.router.navigate(['/home']);
  }
}
