
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class LeadstatusService {
  private apiUrl  = 'https://api-v1-dev.pplplus.org'; 
  private RapiUrl = 'https://api-v1-dev.pplplus.org'; 
  private R2apiUrl = 'https://api-v1-dev.pplplus.org'; 

    constructor(private http: HttpClient) { }

    list(params='') {
        
        return this.http
        .get<any>( this.RapiUrl + '/leadstatus/list?'+params).pipe(
        map(res => res));

      }

      listQuestions(params='') {
        
        return this.http
        .get<any>( this.RapiUrl + '/leadstatus/questions?'+params).pipe(
        map(res => res));

      }

      addEdit(role: any) {
        console.log(role);
           return this.http.post(this.apiUrl + '/leadstatus/addedit',role).pipe(
           map(res => res));
       }

       addEditLeadStatusQuestion(role: any) {
        console.log(role);
           return this.http.post(this.apiUrl + '/leadstatus/addeditleadstatusquestion',role).pipe(
           map(res => res));
       }

    }