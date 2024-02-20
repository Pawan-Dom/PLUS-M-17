
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class DocumentService {
  private apiUrl = 'https://api-v1-dev.pplplus.org';
  private RapiUrl = 'https://api-v1-dev.pplplus.org';
  private R2apiUrl = 'https://api-v1-dev.pplplus.org';
    
    constructor(private http: HttpClient) { }

    getConfig(){
        const  treeConfig: any = {
            baseURL: this.apiUrl+'/document',
            api: {
              listFile: '/list',
              uploadFile: '/upload',
              downloadFile: '/download',
              deleteFile: '/remove',
              createFolder: '/directory',
              renameFile: '/rename',
              searchFiles: '/search'
            },
            options: {
              allowFolderDownload: false,
              showFilesInsideTree: false
            }
          }; 

          return treeConfig;
    }


    list(params='') {
        
      return this.http
      .get<any>( this.RapiUrl + '/document/list/?'+params).pipe(
      map(res => res));

    }

    delete(params='') {
        
      return this.http
      .get<any>( this.apiUrl + '/document/delete/?'+params).pipe(
      map(res => res));

    }

    addEdit(role: any) {
      console.log(role);
         return this.http.post(this.apiUrl + '/document/addedit',role).pipe(
         map(res => res));
     }


     uploadfile(file: File, description: string | Blob) {
      let formData: FormData = new FormData();
      formData.append('file', file, file.name);
      formData.append('description', description);
      
      return this.http.post<any>(this.apiUrl + '/document/uploadfile', formData).pipe(
        map(upost => {
          // login successful if there's a jwt token in the response
          return upost;
        })
      );
    }
    

    // Upload evidence
    uploadEvidencefile(file: string | any[]) {
      let formData: FormData = new FormData();
      for (var i = 0; i < file.length; i++) { 
        formData.append('file[]', file[i], file[i].name);
      }
    
      // return this.http.post<any>(this.apiUrl + '/document/uploadEvidence', formData).pipe(
      // map(upost => {
      //     // login successful if there's a jwt token in the response
         
      //      return upost;
      // }));

      return this.http.post(this.apiUrl + '/document/uploadEvidence', formData, {
        reportProgress: true,
        observe: 'events'
      }).pipe(map(res=>{
        console.log("file result",res);
        return res;
      }))
    }
}