
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { FetchdataService } from './fetchdata.service';
import { Observable } from 'rxjs';

@Injectable()

export class HttpInterceptors implements HttpInterceptors{

    constructor(private fetchdata:FetchdataService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (this.fetchdata.isLoggedIn()) {
            const authToken = this.fetchdata.getAuthorizationToken();
            req = req.clone({
                setHeaders:
                    { Authorization: authToken }
                }
            );
        }
        
        return next.handle(req);
    }
}
