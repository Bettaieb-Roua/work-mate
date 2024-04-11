import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signup_form:any
  
  constructor(private formbuilder:FormBuilder, private http: HttpClient, private router: Router) {
    this.signup_form=this.formbuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      username:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(7)]],
      confirmpassword:['',[Validators.required,Validators.minLength(7)]]
}, { validator: this.passwordMatchValidator }
);
  }
passwordMatchValidator(group: FormGroup) {
  const passwordControl = group.get('password');
  const confirmPasswordControl = group.get('confirmpassword');

  if (passwordControl && confirmPasswordControl) {
    const password = passwordControl.value;
    const confirmPassword = confirmPasswordControl.value;

    return password === confirmPassword ? null : { mismatch: true };
  }

  // En cas de null, considérez que les mots de passe ne correspondent pas
  return { mismatch: true };
}

  ngOnInit() : void {
  }
  create(){
    // Vérifiez si le formulaire est valide avant d'envoyer les données
    if (this.signup_form.valid) {
      // Envoie des données au backend
      this.http.post('http://localhost:3000/api/auth/signup', this.signup_form.value)
        .subscribe(response => {
          console.log("user added"); 
          this.router.navigate(['/login']);
        },(error) => {
          console.error('Error when sign up:', error);
        }

        );
    }
  }

}
