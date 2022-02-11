import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FetchdataService } from './fetchdata.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private route:Router, private fetchdata:FetchdataService){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):any {
      if(this.fetchdata.isLoggedIn())
      {
        return true
      }
    this.route.navigate(['/login'])
  }
}
