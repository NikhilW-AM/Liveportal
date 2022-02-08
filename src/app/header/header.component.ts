import { Component, OnInit } from '@angular/core';
import { FetchdataService } from '../fetchdata.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  
  constructor(private fetchdata:FetchdataService) { }

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
