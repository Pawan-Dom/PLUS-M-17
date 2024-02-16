

import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'

})
export class UserService {
    
    private apiUrl  = 'https://api-v1-dev.pplplus.org'; 
    private RapiUrl = 'https://api-v1-dev.pplplus.org'; 
    private R2apiUrl = 'https://api-v1-dev.pplplus.org'; 



    constructor(private http: HttpClient) { }

    
      
    list(params='') {
    
      return this.http
      .get<any>(this.R2apiUrl + '/user/list?' + params).pipe(
      map(res => {
          //   console.log(quotation);
              sessionStorage.setItem('users',JSON.stringify(res));
              return res;
         }));
    }

       addedit(selectedUser: any) {
       console.log(selectedUser);
       return this.http.post<any>(this.apiUrl + '/user/addedit',  selectedUser ).pipe(
       map(user => {
        console.log(123);
            return user;
       }));
      }

      freezlist(){
        return this.http
        .get<any>(this.R2apiUrl + '/user/userfrzList').pipe(
        map(res => {
            //   console.log(quotation);
                //sessionStorage.setItem('users',JSON.stringify(res));
                return res;
           }));
      }

      defreezuser(userid: any) {
        return this.http.post<any>(this.apiUrl + '/user/DefreezUser ',  { id: userid}).pipe(
        map(user => {
         //   console.log(quotation);
             return user;
        }));
       } 

       motherchildregion() {
        return this.http.get<any>(this.R2apiUrl + '/user/motherZones').pipe(
        map(res => res));
      }

      getchildregion(region: any) {
          console.log(region);
        return this.http.post<any>(this.R2apiUrl + '/user/ChildZonesByregion', { region: region}).pipe(
        map(res => {
                return res;
           }));
      }
}
