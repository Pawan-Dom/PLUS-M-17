
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class TransactionService {
  private apiUrl = 'https://api-v1-dev.pplplus.org';
  private RapiUrl = 'https://api-v1-dev.pplplus.org';
  private R2apiUrl = 'https://api-v1-dev.pplplus.org';

    constructor(private http: HttpClient) { }

    list(params='') {
        return this.http
        .get<any>(this.RapiUrl + '/transaction/list?'+params).pipe(
        map(res => res));
      }

      listreturn(params='') {
        return this.http
        .get<any>(this.RapiUrl + '/transaction/listreturn?'+params).pipe(
        map(res => res));
      }

      listbankstatement(params='') {
        return this.http
        .get<any>(this.RapiUrl + '/transaction/listbankstatement?'+params).pipe(
        map(res => res));
      }


      runreco() {
        return this.http
        .get<any>(this.apiUrl + '/transaction/runreco').pipe(
        map(res => res));
      }


      addedit(r:any) {
          console.log(r);
        return this.http.post<any>(this.apiUrl + '/transaction/addedittransaction', r).pipe(
            map(user => {
                 console.log(user);
                 return user;
            }));
    }

    addeditreturn(r:any) {
//      console.log(r);
    return this.http.post<any>(this.apiUrl + '/transaction/addeditreturntransaction', r).pipe(
        map(user => {
             
             return user;
        }));
    }


    addEditCreditNote(r:any) {
      //      console.log(r);
          return this.http.post<any>(this.apiUrl + '/transaction/addeditcreditnote', r).pipe(
              map(user => {
                   
                   return user;
              }));
          }



    delete(r: any) {
        return this.http.post<any>(this.apiUrl + '/transaction/delete', r).pipe(
        map(user => {
             
             return user;
        }));
      }

      deletebankstatement(r: { id: any; }) {
        return this.http.post<any>(this.apiUrl + '/transaction/deletebankstatement', r).pipe(
        map(user => {
             
             return user;
        }));
      }


      uploadfileandrunreco(file: Blob) {
        let formData: FormData = new FormData();
        // Explicitly cast 'file' to 'File' type to access the 'name' property
        formData.append('file', file as File, (file as File).name);
        
        return this.http.post<any>(this.apiUrl + '/transaction/uploadfileandrunreco', formData).pipe(
          map(upost => {
            // login successful if there's a jwt token in the response
            return upost;
          })
        );
      }
      
      questionuploadfile(file: Blob) {
        let formData: FormData = new FormData();
        // Explicitly cast 'file' to 'File' type to access the 'name' property
        formData.append('file', file as File, (file as File).name);
        
        return this.http.post<any>(this.apiUrl + '/transaction/uploadfilesurvey', formData).pipe(
          map(upost => {
            // login successful if there's a jwt token in the response
            return upost;
          })
        );
      }
      

}