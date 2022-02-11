import { Component, OnInit } from '@angular/core';
import { FetchdataService } from '../fetchdata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public userDetails:any;
  constructor(private fetchdata:FetchdataService, private route:Router) { }

  ngOnInit(): void {
    
  }

  get isLogin()
  {
    return this.fetchdata.isLoggedIn()
  }
  logout()
  {
    this.fetchdata.logout()
  }

}
