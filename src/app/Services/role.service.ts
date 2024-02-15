

import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiUrl = 'https://api-v1-dev.pplplus.org';

    constructor(private http: HttpClient) { }

    list() {
        return this.http
        .get<any>(this.apiUrl + '/role/list').pipe(
        map(res => res));
      }

    listPermissions(){
        return this.http
        .get<any>(this.apiUrl + '/role/listpermissions').pipe(
        map(res => res));
    }  
    
       addEdit(role: any) {
        console.log(role);
           return this.http.post(this.apiUrl + '/role/addedit',role).pipe(
           map(res => res));
       }

       search(term : any='0') {
        return this.http
        .get<any>(this.apiUrl + '/role/search?q='+term).pipe(
        map(res => res));
      }
}
