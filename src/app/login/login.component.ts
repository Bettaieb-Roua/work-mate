import { HttpClient } from '@angular/common/http';
import { Component , OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedDataService } from '../shared-data.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login_form:any
  constructor(private formbuilder:FormBuilder, private route:Router , private http: HttpClient , private sharedDataService:SharedDataService) {
    this.login_form=this.formbuilder.group({
      username:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(7)]],

    })
  }
  ngOnInit() : void {
  }
  login(){
    if (this.login_form.valid) {
      // Envoie des données au backend
      this.http.post<any>('http://localhost:3000/api/auth/login', this.login_form.value)
        .subscribe(response => {
          console.log("user logged in",response); 
          const username = response.data.username;
          console.log(username);
          this.sharedDataService.setUsername(username);
          this.route.navigate([`/home`]);
          
        },(error) => {
          console.error('Erreur lors du login:', error);
          // Gérez l'erreur comme nécessaire
        }

        );
    }
  }
  navigateToSignUp(){
  this.route.navigate(['/signup'])
  }


} {

}
