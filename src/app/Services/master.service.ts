
import {catchError, filter, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MasterService {
  private apiUrl = 'https://api-v1-dev.pplplus.org';
  private RapiUrl = 'https://api-v1-dev.pplplus.org';
  private R2apiUrl = 'https://api-v1-dev.pplplus.org';


    constructor(private http: HttpClient) { }

    listcity(params='') {
        return this.http
        .get<any>(this.RapiUrl + '/master/listcity?'+params).pipe(
        map(res => res));
      }

      listmetamaster(params='') {
        return this.http
        .get<any>(this.RapiUrl + '/master/listmetamaster?'+params).pipe(
        map(res => res));
      }

      listmetatypes(params='') {
        return this.http
        .get<any>(this.RapiUrl + '/master/listmetatypes?'+params).pipe(
        map(res => res));
      }

      listeventvenuetag(params='') {
        return this.http
        .get<any>(this.RapiUrl + '/master/listeventvenuetag?'+params).pipe(
        map(res => res));
      }
      

    citysearch(term : any='0') {
        return this.http
        .get<any>(this.RapiUrl + '/master/citysearch?q='+term).pipe(
        map(res => res));
      }

      metasearch(term: string = '', type: string = ''): Observable<any> {
        const encodedTerm = encodeURIComponent(term);
        const encodedType = encodeURIComponent(type);
        
        return this.http.get<any>(`${this.R2apiUrl}/master/metasearch?q=${encodedTerm}&type=${encodedType}`).pipe(
          catchError(error => {
            console.error('Error in metasearch request:', error);
            return of(null); // Return an observable with null value in case of error
          }),
          filter(res => res !== null), // Filter out null responses
          map(res => res)
        );
      }
      
    
      addeditcity(customer: any) {  
        return this.http.post(this.apiUrl + '/master/addeditcity',customer).pipe(
        map(res => res));
      }
      
      addeditmetamaster(customer: any) {  
        return this.http.post(this.apiUrl + '/master/addeditmetamaster',customer).pipe(
        map(res => res));
      }

      deletecity(params='') {
        
        return this.http
        .get<any>( this.apiUrl + '/master/deletecity/?'+params).pipe(
        map(res => res));
  
      }


      deletemetamaster(params='') {
        
        return this.http
        .get<any>( this.apiUrl + '/master/deletemetamaster/?'+params).pipe(
        map(res => res));
  
      }

      searcheventname(term : any='') {
        console.log("event name", term);
        return this.http
        .get<any>(this.RapiUrl + '/Quotation/EventnameSearch?q='+term).pipe(
        map(res => res));
      }
}  
