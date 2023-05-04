import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from './user.model';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authSerivce: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.authSerivce.userSubject.pipe(
      take(1),
      exhaustMap(user => {
        let authReq;
          if(user){
            authReq = request.clone({ params:  new HttpParams().set('auth', user.token) });
          } else {
            authReq = request.clone();
          }    
        
        return next.handle(authReq);
      })
    );
  }
}
