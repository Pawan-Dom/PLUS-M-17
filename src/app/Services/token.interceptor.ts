// token.interceptor.ts

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

 // token.interceptor.ts

intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.authService.getCurrentUser();
  
    if (currentUser && currentUser.token) {
      console.log('Adding Authorization header:', currentUser.token);
  
      // Clone the request and add the Authorization header if a token is available
      const modifiedRequest = request.clone({ setHeaders: { Authtoken: `Bearer ${currentUser.token}` } });
      return next.handle(modifiedRequest);
    }
  
    // If there is no token, proceed with the original request
    return next.handle(request);
  }
  
}
