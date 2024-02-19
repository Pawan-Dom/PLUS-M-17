import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = 'https://api-v1-dev.pplplus.org/auth1';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const loginUrl = `${this.apiUrl}/login`;
    // Adjust payload as per your API requirements
    const payload = { email, password };
    return this.http.post(loginUrl, payload);
  }
  // login(email: string, password: string): Observable<any> {
  //   const loginUrl = `${this.apiUrl}/login`;
  //   const payload = { email, password };
  //   return this.http.post(loginUrl, payload);
  // }
}
