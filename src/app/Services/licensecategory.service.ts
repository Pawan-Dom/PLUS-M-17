
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class LicenseCategoryService {
    private apiUrl  = 'https://api-v1-dev.pplplus.org'; 
    private RapiUrl = 'https://api-v1-dev.pplplus.org'; 
    private R2apiUrl = 'https://api-v1-dev.pplplus.org'; 

    constructor(private http: HttpClient) { }

    list() {
        return this.http
        .get<any>(this.R2apiUrl + '/licensecategory/list').pipe(
        map(res => {
            //   console.log(quotation);
                sessionStorage.setItem('lcs',JSON.stringify(res));
                return res;
           }));
      }
}
