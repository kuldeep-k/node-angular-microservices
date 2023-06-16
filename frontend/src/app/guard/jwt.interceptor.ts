import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthGuardService } from './auth-guard.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authGuardService: AuthGuardService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    console.log("IN INTERCEPTOR")
    if(this.authGuardService.isAuthenticated()) {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.authGuardService.getToken()}`
            }
        }); 
    }
    return next.handle(request);
  }
}
