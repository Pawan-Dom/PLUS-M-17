import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import swal from 'sweetalert2';
declare var jQuery: any;

@Injectable()
export class CommonService {
   apiUrl = 'https://api-v1-dev.pplplus.org';
  servicePNotify: any;

  constructor(private http: HttpClient) { }

  isDevInstance() {
    return this.apiUrl.includes('dev');
  }

  cloneWR(p: any) {
    return JSON.parse(JSON.stringify(p));
  }

  showModal(id: any) {
    this.openModal(id);
  }

  openModal(event: string) {
    const element = document.querySelector('#' + event);
    if (element) {
      element.classList.add('md-show');
    } else {
      console.error(`Element with id '${event}' not found.`);
    }
  }
  
  sa(m1: string, m2: string, m3?: SweetAlertIcon) {
    Swal.fire(m1, m2, m3);
}
  windowpopup(path = '', width = 999, height = 700) {
    window.open(path, '_blank', 'toolbar=no,scrollbars=yes,resizable=yes,top=50,left=200,width=' + width + ',height=' + height);
  }

  hideModal(event = '') {
    const element = document.querySelector('#' + event);
    if (element) {
      element.classList.remove('md-show');
      if (event === '0') {
        // jQuery(".modal").modal("hide");
      } else {
        // jQuery("#"+id).modal("hide");
      }
    } else {
      console.error(`Element with id '${event}' not found.`);
    }
  }
  

  notify(type: string, title: string, msg = null) {
    this.servicePNotify.notify(type, title, msg);
  }

  getCurrentUser() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser !== null) {
        return JSON.parse(currentUser);
    }
    return null; // or whatever default value you want to return if 'currentUser' doesn't exist
}
getCurrentRegion() {
  const currentRegion = localStorage.getItem('currentRegion');
  if (currentRegion !== null) {
      return JSON.parse(currentRegion);
  }
  return null; // or whatever default value you want to return if 'currentRegion' doesn't exist
}


field_validate($event: { target: { value: string; }; }, cf: any, $object: string): 0 | undefined {
  let regexp: any;

  let val: any = $event.target.value;
  if (val.length < 1) { return 0; }

  switch (cf) {

    case 'mobile':
      regexp = /^([0-9]){10}?$/;
      console.log(regexp.test(val));
      if (regexp.test(val)) {
          return 0;
      } else {
        $event.target.value = '';
        $object = '';
        this.notify('error', 'Invalid Mobile Number');
      }
      break;

    case 'pan':
      regexp = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
      console.log(regexp.test(val));
      if (regexp.test(val)) {
          return 0;
      } else {
        $event.target.value = '';
        $object = '';
        this.notify('error', 'Invalid PAN Number');
      }
      break;

    case 'gst':
      regexp = /^([0-9]){2}([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}([0-9]){1}([a-zA-Z1-9]){1}([a-zA-Z0-9]){1}$/;

      if (regexp.test(val)) {
          return 0;
      } else {
        $event.target.value = '';
        $object = '';
        this.notify('error', 'Invalid GST Number');
      }
      break;

    case 'tan':

      regexp = /^([a-zA-Z]){4}([0-9]){5}([a-zA-Z]){1}?$/;
      if (regexp.test(val)) {
          return 0;
      } else {
        $event.target.value = '';
        $object = '';
        this.notify('error', 'Invalid TAN Number');
      }
      break;

  }

  return undefined; // Ensure a return value for all code paths
}


  setCurrentCustomer(customerData: any) {
    return localStorage.setItem('currentcustomer', JSON.stringify(customerData));
  }

  getCurrentCustomer() {
    const currentcustomer = localStorage.getItem('currentcustomer');
    if (currentcustomer !== null) {
        return JSON.parse(currentcustomer);
    }
    return null;
}



  removeCurrentCustomer() {
    localStorage.removeItem('currentcustomer');
  }
  getCurrentRole() {
    const currentUserString = localStorage.getItem('currentUser');
    if(currentUserString) {
        return JSON.parse(currentUserString);
    }
    return null; // or whatever default value you prefer
}


  setSearchCustomer(searchCust: any) {
    return localStorage.setItem('searchCustomer', JSON.stringify(searchCust));
  }

  getSearchCustomer() {
    const searchCustomer = localStorage.getItem('searchCustomer');
    if (searchCustomer !== null) {
        return JSON.parse(searchCustomer);
    }
    return null;
}


  removeSearchCustomer() {
    localStorage.removeItem('searchCustomer');
  }
}
