import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { FetchdataService } from '../fetchdata.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signin:FormGroup
  submitted = false;
  returnUrl?: string;
  error?: {};
  loginError?: string;
  hide = true;
  //socialUser?: SocialUser;
  isLoggedin?: boolean;
  tok: any;

  constructor(private router:ActivatedRoute, private route:Router,private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,private fb : FormBuilder, private fetchdata:FetchdataService,private recaptchaV3Service: ReCaptchaV3Service) {
      this.signin = this.fb.group({  
        username:[''],
        password:[''],
        }); 
     
    }

  ngOnInit(): void {
    this.fetchdata.logout(); 
  }

  loginwithgoogle()
  {}

  get username() { return this.signin.get('username'); }
  get password() { return this.signin.get('password'); }

  submitForm(signin:FormGroup){
    this.submitted = true;
    if (signin.invalid) {
      for (const control of Object.keys(signin.controls)) {
        signin.controls[control].markAsTouched();
      }
      return;
    }
    this.recaptchaV3Service.execute('importantAction')
    .subscribe((token: string) => {
      this.tok = token
      console.log(`Token :- ${token}`);
      this.fetchdata.login(this.signin.value.username, this.signin.value.password,this.tok).subscribe((data:any) => {
        console.log(data)
       if (this.fetchdata.isLoggedIn()) {
           this.route.navigate(['/question']);
         } else {
           this.loginError = 'Username or password is incorrect.';
         }
       },
       (error:any) => this.error = error
     );
    });
  }
  
}
