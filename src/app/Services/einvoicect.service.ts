
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class EinvoicectService {
  private apiUrl = 'https://api-v1-dev.pplplus.org';
  private RapiUrl = 'https://api-v1-dev.pplplus.org';
  private R2apiUrl = 'https://api-v1-dev.pplplus.org';

  constructor(private http: HttpClient) { }

  list(params = '') {

    return this.http
      .get<any>(this.RapiUrl + '/Einvoicect/list?' + params).pipe(
        map(res => res));

  }
}
