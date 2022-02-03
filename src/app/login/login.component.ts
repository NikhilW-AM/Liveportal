import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide : boolean = true
  constructor(private fb:FormBuilder) {}

  signin = this.fb.group({  
    username:[''],
    password:[''],
    }); 

  ngOnInit(): void {
  }

  loginwithgoogle()
  {}
}
