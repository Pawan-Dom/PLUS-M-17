// error.interceptor.ts

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An error occurred';
        console.error('Error intercepted:', error);

        if (error.status === 401) {
          errorMessage = 'Unauthorized';
        } else if (error.status === 403) {
          errorMessage = 'Forbidden';
        }

        this.snackBar.open(errorMessage, 'Close', { duration: 3000 });

        return throwError(error);
      })
    );
  }
}
