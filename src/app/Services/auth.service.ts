// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
declare var _paq: any[];
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  cloneWR(row: any): any {
    throw new Error('Method not implemented.');
  }
  listmaster(params: string) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'https://api-v1-dev.pplplus.org/auth1';
  private RapiUrl = 'https://api-v1-dev.pplplus.org'; // Fix the typo here


  private tokenKey = 'token'; // Key for storing the token in local storage
  private userKey = 'currentUser'; // Key for storing user data in local storage

  constructor(private http: HttpClient) {
    // Check if there is a stored user token on application startup
    this.retrieveStoredUserToken();
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials)
      .pipe(
        map((response: any) => {
          if (response.token) {
            localStorage.setItem(this.userKey, JSON.stringify(response));
            localStorage.setItem(this.tokenKey, response.token);
          }
          return response;
        })
      );
  }

 
  
  
 

  getUserToken(): string | null {
    // Retrieve the user token from local storage
    const currentUser = this.getCurrentUser();
    return currentUser ? currentUser.token : null;
  }

  getCurrentUser(): any {
    // Retrieve the user data from local storage
    const storedUser = localStorage.getItem(this.userKey);
    return storedUser ? JSON.parse(storedUser) : null;
  }
  isAuthenticated(): boolean {
    const isAuthenticated = !!this.getUserToken();
    console.log('Is Authenticated:', isAuthenticated);
    return isAuthenticated;
  }
  
  refreshToken(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/auth1/refreshtoken`).pipe(
      map(user => {
        localStorage.setItem('token', user.token);
        localStorage.setItem('currentUser', JSON.stringify(user));
        // Ensure _paq is globally accessible before using it
        if (typeof _paq !== 'undefined') {
          let uid = user.name + ' - ' + user.id;
          _paq.push(['setUserId', uid.toString()]);
          _paq.push(['trackPageView']);
        }
        return user;
      })
    );
  }

changePassword(model: any) {
  return this.http.post<any>(this.apiUrl + '/user/changepassword', model).pipe(
      map(user => {
           
           return user;
      }));
}


  
  

  private retrieveStoredUserToken(): void {
    // Retrieve the user token from local storage
    // (If you need to perform any additional logic with the token, you can do it here)
  }

  logout(): void {
    // Clear the stored user data and token
    localStorage.removeItem(this.userKey);
    localStorage.removeItem(this.tokenKey);
  }
  checkPermission(pid: { toString: () => any; }){
    const cu= this.getCurrentUser();
 //   console.log(pid,cu.role.permissions);
    if(cu.role.allowall_super === '1'){
        return true;
    }

    if(cu.role.permissions){
        const pus=cu.role.permissions.split(',');
        // console.log(pus,pid.toString(),pus.includes(pid.toString()));
        return pus.includes(pid.toString());
    }
//       return true;
}
list1(params = ''): Observable<any> {
  return this.http
    .get<any>(this.RapiUrl + '/lead/list?' + params)
    .pipe(
      map(res => {
        sessionStorage.setItem('leads', JSON.stringify(res));
        return res;
      })
    );
}
list12(params = ''): Observable<any> {
  return this.http
    .get<any>(this.RapiUrl + '/customer/list?' + params)
    .pipe(
      map(res => {
        sessionStorage.setItem('customers', JSON.stringify(res));
        return res;
      })
    );
}
list123(params = ''): Observable<any> {
  return this.http
    .get<any>(this.RapiUrl + '/quotation/list?' + params)
    .pipe(
      map(res => {
        sessionStorage.setItem('quotations', JSON.stringify(res));
        return res;
      })
    );
}

listcity(params = ''): Observable<any> {
  return this.http
    .get<any>(this.RapiUrl + '/master/listcity?'+ params)
    .pipe(
      map(res => {
        sessionStorage.setItem('roles', JSON.stringify(res));
        return res;
      })
    );
}
listmetamaster(params = ''): Observable<any> {
  return this.http
    .get<any>(this.RapiUrl + '/master/listmetamaster?' + params)
    .pipe(
      map(res => {
        sessionStorage.setItem('metamasters', JSON.stringify(res));
        return res;
      })
    );
}

addeditmetamaster(params = ''): Observable<any> {
  return this.http
    .get<any>(this.RapiUrl + '/master/addeditmetamaster'+ params)
    .pipe(
      map(res => {
        sessionStorage.setItem('roles', JSON.stringify(res));
        return res;
      })
    );
}

citysearch(params = ''): Observable<any> {
  return this.http
    .get<any>(this.RapiUrl + '/master/citysearch?q='+ params)
    .pipe(
      map(res => {
        sessionStorage.setItem('roles', JSON.stringify(res));
        return res;
      })
    );
}

addeditcity(params: any = {}): Observable<any> {
  return this.http
    .post<any>(this.RapiUrl + '/master/addeditcity', params)
    .pipe(
      map(res => {
        sessionStorage.setItem('roles', JSON.stringify(res));
        return res;
      })
    );
}

branchlist(params = ''): Observable<any> {
  return this.http
    .get<any>(this.RapiUrl + '/branch/list'+ params)
    .pipe(
      map(res => {
        sessionStorage.setItem('roles', JSON.stringify(res));
        return res;
      })
    );
}

rolelist(params = ''): Observable<any> {
  return this.http
    .get<any>(this.RapiUrl +  '/role/list'+ params)
    .pipe(
      map(res => {
        sessionStorage.setItem('roles', JSON.stringify(res));
        return res;
      })
    );
}

addEdit(selectedUser: any) {
  console.log(selectedUser);
  return this.http.post<any>(this.apiUrl + '/user/addedit',  selectedUser ).pipe(
  map(user => {
   //   console.log(quotation);
       return user;
  }));
 }
 
list2040(params = ''): Observable<any> {
  return this.http
    .get<any>(this.RapiUrl + '/branch/list?' + params)
    .pipe(
      map(res => {
        sessionStorage.setItem('customers', JSON.stringify(res));
        return res;
      })
    );
}
list2096(params = ''): Observable<any> {
  return this.http
    .get<any>(this.RapiUrl + '/customer/list?' + params)
    .pipe(
      map(res => {
        sessionStorage.setItem('customers', JSON.stringify(res));
        return res;
      })
    );
}
list1020() {
  return this.http
  .get<any>(this.apiUrl + '/role/list').pipe(
  map(res => res));
}

addeditcustomer(customer: any): Observable<any> {  
  const url = `${this.apiUrl}/customer/addeditcustomer`;
  console.log('API URL:', url);
  return this.http.post<any>(url, customer);
}
list08012000() {
  return this.http
  .get<any>(this.apiUrl + '/role/list').pipe(
  map(res => res));
}

listPermissions(){
  return this.http
  .get<any>(this.apiUrl + '/role/listpermissions').pipe(
  map(res => res));
} 


listmetatypes(params='') {
  return this.http
  .get<any>(this.RapiUrl + '/master/listmetatypes?'+params).pipe(
  map(res => res));
}

motherchildregion() {
  return this.http.get<any>(this.RapiUrl + '/user/motherZones').pipe(
  map(res => res));
}

getchildregion(region: any) {
    console.log(region);
  return this.http.post<any>(this.RapiUrl + '/user/ChildZonesByregion', { region: region}).pipe(
  map(res => {
          return res;
     }));
}
}
