

import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'https://api-v1-dev.pplplus.org';
  private RapiUrl = 'https://api-v1-dev.pplplus.org';
  private RapidUrl = 'https://api-v1-dev.pplplus.org';

    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.post<any>(this.apiUrl + '/auth1/login', { email: username, password: password }).pipe(
            map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    localStorage.setItem('token', user.token);
                }
                 return user;
            }));
    }

    list(params='') {
        return this.http
        .get<any>(this.RapiUrl + '/customer/list?'+params).pipe(
        map(res => res));
      }

      customergrouplist(params='') {
        return this.http
        .get<any>(this.RapiUrl + '/customer/customergrouplist?'+params).pipe(
        map(res => res));
      }


      search(term : any='0') {
        return this.http
        .get<any>(this.RapiUrl + '/customer/search?q='+term).pipe(
        map(res => res));
      }

     addeditcustomer(customer: any) {  
        return this.http.post(this.apiUrl + '/customer/addeditcustomer',customer).pipe(
        map(res => res));
      }

      addeditcustomergroup(customer: any) { 
       
        return this.http.post(this.apiUrl + '/customer/addeditcustomergroup',customer).pipe(
        map(res => res));
      }
     
}

