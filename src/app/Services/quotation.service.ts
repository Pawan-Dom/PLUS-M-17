
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class QuotationService {
  private apiUrl  = 'https://api-v1-dev.pplplus.org'; 
    private RapiUrl = 'https://api-v1-dev.pplplus.org'; 
    private R2apiUrl = 'https://api-v1-dev.pplplus.org'; 

  constructor(private http: HttpClient) { }

  list(params = '') {

    return this.http
      .get<any>(this.RapiUrl + '/quotation/list?' + params).pipe(
        map(res => res));

  }

  creditnotelist(params = '') {

    return this.http
      .get<any>(this.RapiUrl + '/creditnote/list?' + params).pipe(
        map(res => res));

  }


  licenselist(params = '') {

    return this.http
      .get<any>(this.RapiUrl + '/quotation/licenselist?' + params).pipe(
        map(res => res));

  }

  Rlist(params = '') {
    return this.http
      .get<any>(this.RapiUrl + '/quotation/list?' + params).pipe(
        map(res => res));
  }

  getreportlist(params = '') {
    return this.http
      .get<any>(this.RapiUrl + '/report/list').pipe(
        map(res => res));
  }


  getSingle(id: string,uuid: any) {
    console.log(id,uuid,' get single id and uuid');
    return this.http
      .get<any>(this.apiUrl + '/quotation/single?id=' + id).pipe(
        map(res => res));
  }

  getPincodeinfo(id: string) {
    return this.http
      .get<any>(this.RapiUrl + '/quotation/pincodeinfo?pincode=' + id).pipe(
        map(res => res));
  }

  addSave($debug: any) {
    //        console.log(JSON.stringify($debug));

    return this.http.post<any>(this.apiUrl + '/quotation/addsave', $debug).pipe(
      map(quotation => {
        //   console.log(quotation);
        return quotation;
      }));
  }

  addSaveIssuedLc(ilc: any) {

    //console.log(ilc);    
    return this.http.post<any>(this.apiUrl + '/quotation/addsaveissuedlc', ilc).pipe(
      map(quotation => {
        //   console.log(quotation);
        return quotation;
      }));
  }


  addSaveDiscountRequest(ilc: any) {

    console.log(ilc);
    return this.http.post<any>(this.apiUrl + '/quotation/addsavediscountrequest', ilc).pipe(
      map(quotation => {
        //   console.log(quotation);
        return quotation;
      }));
  }

  addSaveAtiRequest(ilc: any) {

    console.log(ilc);
    return this.http.post<any>(this.apiUrl + '/quotation/addsaveatirequest', ilc).pipe(
      map(quotation => {
        //   console.log(quotation);
        return quotation;
      }));
  }

  addSavePitagRequest(ilc: any) {

    console.log(ilc);
    return this.http.post<any>(this.apiUrl + '/quotation/addsavetagpi', ilc).pipe(
      map(quotation => {
        //   console.log(quotation);
        return quotation;
      }));
  }

  //  Request for PI
  AddSavePIRequest(ilc: any) {

    console.log(ilc);
    return this.http.post<any>(this.apiUrl + '/quotation/AddSavePIRequest', ilc).pipe(
      map(quotation => {
        //   console.log(quotation);
        return quotation;
      }));
  }

  venuesearch(term: any = '0') {
    return this.http
      .get<any>(this.RapiUrl + '/quotation/venuesearch?q=' + term).pipe(
        map(res => res));
  }





  uploadfileandrunbu(file: File) { // Change type to File
    let formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post<any>(this.apiUrl + '/quotation/bulkimportfilecsvtojson', formData).pipe(
      map(upostn => {
        return upostn;
      })
    );
  }


  genReport(params: any) {
    // return this.http
    // .get<any>(this.apiUrl + '/report/genreport?'+params).pipe(
    // map(res => res));

    return this.http.post<any>(this.R2apiUrl + '/report/genreport', params).pipe(
      map(upostn => {
        // login successful if there's a jwt token in the response

        return upostn;
      }));

  }

  getDashboarddata(params = '') {
    return this.http
      .get<any>(this.RapiUrl + '/report/dashboarddata?' + params).pipe(
        map(res => res));
  }

  genGststatecodes(params = '') {
    return this.http
      .get<any>(this.RapiUrl + '/quotation/gststatecodes').pipe(
        map(res => res));
  }

  markCancel(id: string) {
    return this.http
      .get<any>(this.apiUrl + '/quotation/markcancel/?id=' + id).pipe(
        map(res => res));
  }

  quotationsendalert(param: any) {
    return this.http.post<any>(this.apiUrl + '/quotation/sendalert', param).pipe(
      map(res => {
        return res;
      }));
  }

  recreateLicenses(quotation_id: any) {
  // console.log('id', quotation_id);
    return this.http.post<any>(this.apiUrl + '/quotation/resetlicenses', { id: quotation_id}).pipe(
      map(res => {
        return res;
      }));
  }

  licensedwllist(params = '') {
    return this.http
      .get<any>(this.RapiUrl + '/quotation/DownloadLicenseList?' + params).pipe(
        map(res => res));
  }

  addSaveEvidence($debug: any){
    //        console.log(JSON.stringify($debug));

    return this.http.post<any>(this.apiUrl + '/quotation/addSaveEvidence', $debug).pipe(
      map(quotation => {
        //   console.log(quotation);
        return quotation;
      }));
  }

  // createrenewalpi api call
  // createrenewalpi($debug) {
  //   console.log('create renewal pi', $debug);
  //   return this.http.post<any>(this.apiUrl + '/quotation/renewalpi', $debug).pipe(
  //     map(q => {
  //       return q;
  //     }));
  // }

  cancelInvoice(quotation_id: any) {
    return this.http.post<any>(this.apiUrl + '/einvoicect/Cancelinvoice', { id: quotation_id}).pipe(
      map(res => {
        return res;
      }));

    
  }

  // Add Save customer no pan Request

  addSaveCpnRequest(ilc: any) {

    console.log(ilc);
    return this.http.post<any>(this.apiUrl + '/quotation/AddSavecustomernopanRequest', ilc).pipe(
      map(quotation => {
        //   console.log(quotation);
        return quotation;
      }));
  }
}
