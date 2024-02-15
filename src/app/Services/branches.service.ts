
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BranchService {
  private apiUrl = 'https://api-v1-dev.pplplus.org';

    constructor(private http: HttpClient) { }

      list() {
        return this.http
        .get<any>(this.apiUrl + '/branch/list').pipe(
        map(res => res));
      }

      addeditbranch(branch: any) {
        console.log(branch);
      	return this.http.post(this.apiUrl +'/branch/addeditbranch',branch).pipe(
      	map(res => res));
      }

       edit(selectedBranch: any) {
       console.log(selectedBranch);
      	return this.http.put('',selectedBranch).pipe(
      	map(res => res));
      }
}
