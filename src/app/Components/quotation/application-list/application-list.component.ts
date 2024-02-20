import { Component, OnInit, ViewChild, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { HttpClient, HttpParams } from '@angular/common/http';
import swal, { SweetAlertResult } from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { distinctUntilChanged, debounceTime, switchMap, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthService } from '../../../Services/auth.service';
import { UserService } from '../../../Services/user.service';
import { CommonService } from '../../../Services/common.service';
import { QuotationService } from '../../../Services/quotation.service';
import { CustomerService } from '../../../Services/customer.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: [
    './application-list.component.scss',
    '../../../../assets/icon/icofont/css/icofont.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class ApplicationListComponent implements OnInit {
  rowsBasic = [];
  fullScreenRow = [];
  loadingIndicator = false;
  aceptreject = false;
  reorderable = true;
  rows = [];
  showdr = '';
  roflag = false;
  public show: boolean;
  public showmultidr: boolean;
  multidr = false;
  showcheck = false;
  model: any = {};

  showatir = '';
  tabrows = [];
  expanded = {};
  timeout: any;
  rowsFilter = [];
  tempFilter = [];
  selecteddrreqArr: any[] = []; 
  qd: any = [];
  searchq!: string;
  // searchqlic :string;
  searchqf!: string;
  searchquserf!: string;
  //searchqregionf='All';
  searchqregionf!: string;
  searchqsubregionf!: string;
  searchqcustomerf!: string;
  searchqevidence!: string;
  searchqextnd!: string;
  users: any;
  reject_remark ='';
  page: any = {
    limit: 7,
    count: 0,
    offset: 0,

    orderBy: 'id',
    orderDir: 'desc'
  };
  currentUser: any;
  /*filterq:any;
  filteruserq:any;
  filterregionq:any;*/

  pirUrl: any;
  rowid: any;
  saveatiinprogress = false;
  checkpiflag = false;
  searchqlimit = '7';
  atirmodel:any;

  @ViewChild(DatatableComponent) table!: DatatableComponent;

  custTypeahead = new Subject<string>();
  custLoading = false;
  customers: any = [];
  searchcustomer: any;
  region_ids: any;
  discountmodel!: {};
  pirmodel!: {};
  constructor(public authService: AuthService, public userService: UserService, public route: ActivatedRoute, public commonService: CommonService, public quotationService: QuotationService, public router: Router, protected sanitizer: DomSanitizer, private cd: ChangeDetectorRef, public customerService: CustomerService) {
    /*this.fetchBasicData((data) => {
      this.rowsBasic = data;
      setTimeout(() => { this.loadingIndicator = false; }, 1500);
    });

    this.fetch((data) => {
      this.rows = data;
    });

    this.fetchFullScreenData((data) => {
      this.fullScreenRow = data;
    });

    this.fetchFilterData((data) => {
      // cache our list
      this.tempFilter = [...data];

      // push our inital complete list
      this.rowsFilter = data;
    });*/

    // this.getList();
    this.searchqlimit = '7'
    this.multidr = false;

    this.route.params.subscribe(params => {
      console.log(params['show']);
      this.showdr = params['show'];
      if (params['show']) {
        let searchfilter: string = ''; // Assign an initial value to searchfilter
        let pagecunt = '7';
        this.searchqlimit = pagecunt;
        this.searchqf = searchfilter; // Now it's safe to use searchfilter
        this.model.permissions = [];
    }
    
      // this.searchqf ="All";
      // alert('get'+  params['show']);
      // if(params['q']){
      // this.searchq=params['q'];
      // }  
      if (params['q']) {
        this.searchcustomer = this.commonService.getSearchCustomer();
        if (this.searchcustomer) {
          this.searchqcustomerf = this.searchcustomer;
          this.customers[0] = this.searchcustomer;
          this.commonService.removeSearchCustomer();
        }
        this.searchqcustomerf = params['q'];
      }
      this.pageCallback({ offset: 0 });
      // this.getList();
    });

    this.currentUser = this.commonService.getCurrentUser();
    this.getUsers();
    // this.pageCallback({ offset: 0 });
    this.motherRegion();
    this.show = false;
    this.showmultidr = false;
  }

  
  
  getUsers() {
    const storedUsers = sessionStorage.getItem('users');
    if (storedUsers !== null) {
        this.users = JSON.parse(storedUsers);
    } else {
        this.userService.list('showall=0').subscribe(
            res => {
                // this.loading=false;       
                this.users = res;
            }
        );
    }
}


  pageCallback(pageInfo: { count?: number, pageSize?: number, limit?: number, offset?: number }) {
    this.page.offset = pageInfo.offset;
    this.getList();
  }



 // mother child regions
 motherRegion(){
  this.userService.motherchildregion().subscribe(
    res => {
      if(res.length>0){
        this.region_ids= res;
      }  
    }
);
}


  // getCustomers
  getList() {
    this.selecteddrreqArr = [];
    this.model.permissions = [];

    /*    const params = new HttpParams()
        .set('orderColumn', `${this.page.orderBy}`)
        .set('orderDir', `${this.page.orderDir}`)
        .set('pageNumber', `${this.page.offset}`)
        .set('pageSize', `${this.page.limit}`); */
    if (this.searchqlimit) {
      this.page.limit = this.searchqlimit;
    } else {
      this.page.limit = 7;
    }
    let params = 'pageoffset=' + this.page.offset;
    params = params + '&limit=' + this.page.limit;

    if (this.searchq) {
      params = params + '&searchq=' + encodeURIComponent(this.searchq);
    }
    if (this.showdr == 'dr') {
      if ((this.commonService.getCurrentUser().role.id == 72 || this.commonService.getCurrentUser().role.id == 73) && this.searchqf == undefined) {
        params = params + '&searchqf=Pending for approval';
      }
    }
    if (this.searchqf) {
      params = params + '&searchqf=' + this.searchqf;
    }


    if (this.searchquserf) { params = params + '&searchquserf=' + this.searchquserf; }
    if (this.searchqregionf) { params = params + '&searchqregionf=' + this.searchqregionf; }
    if (this.searchqcustomerf) { params = params + '&searchqcustomerf=' + this.searchqcustomerf; }
    if (this.searchqevidence) { params = params + '&searchqevidence=' + this.searchqevidence; }
    if (this.searchqextnd){ params = params + '&searchqextnd=' + this.searchqextnd; }

    if (this.showdr) {
      params = params + '&showdr=' + this.showdr;
    }

    if (this.searchqsubregionf) { params = params + '&searchqsubregionf=' + this.searchqsubregionf; }
    // if (this.searchqlic) {
    //   params = params + '&searchqlic=' + encodeURIComponent(this.searchqlic);
    // }
    




    this.loadingIndicator = true;
    let tr = [];
    this.quotationService.list(params).subscribe(
      res => {

        this.page.count = res.count;
        this.page.approver_user = res.approver_user;
        this.page.reporting_user = res.reporting_user;
        this.tabrows = res.rows;
        this.tempFilter = res;
        this.loadingIndicator = false;
      }
    );
  }

  view(row: any) {
    console.log(row);
  }

  edit(row: { id: string; uuid: string; }) {
    this.router.navigate(['/quotation/view'+ row.id+'/'+row.uuid]);
  }

  delete(row: any) {
  }

  add() {

  }

  ngOnInit() {

    let that = this;
    setTimeout(function () { that.openChangePassword(); }, 5000);
    console.log("change detect....");
    this.loadPeople3();
    this.multidr = false;
    this.searchqlimit = '7';
    
  }

  search() {
    this.pageCallback({ offset: 0 });
  }

  fetchBasicData(cb: (arg0: any) => void) {
    const req = new XMLHttpRequest();
    req.open('GET', 'assets/data/basic.json');

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  fetchFullScreenData(cb: (arg0: any) => void) {
    const req = new XMLHttpRequest();
    req.open('GET', 'assets/data/fullscreen.json');

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  fetchFilterData(cb: (arg0: any) => void) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }




  onPage(event: any) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

  fetch(cb: (arg0: any) => void) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/100k.json`);

    req.onload = () => {
      const rows = JSON.parse(req.response);

      for (const row of rows) {
        row.height = Math.floor(Math.random() * 80) + 50;
      }

      cb(rows);
    };
    req.send();
  }

  getRowHeight(row: { height: any; }) {
    return row.height;
  }


  dr_request(q: { dr_discount?: any; dr_comment?: any; noc?: any; extended_pi?: any; id?: any; action?: any; pir_status?: any; reject_remark?: any; dr_status?: any; dr_rejectremark?: any; }, status: string) {
    q.action = status;
    q.reject_remark = this.reject_remark;
    console.log('discount data remark',this.reject_remark);
    this.commonService.hideModal('modaldiscountrejectrequest'); 

    this.commonService.notify('info', 'Please Wait....');
    this.quotationService.addSaveDiscountRequest(q)
      .subscribe(
        data => {
          this.commonService.hideModal('modalviewpirequest');
          if (q.dr_discount > 99) {
            this.commonService.notify('info', 'NOC Approval Status Updated Successfully');
          } else {
            this.commonService.notify('info', 'Discount Approval Status Updated Successfully');
          }

          q.dr_status = status;
          if(status=='reject'){
            q.dr_rejectremark=q.reject_remark;
          }
          
          this.selecteddrreqArr = [];
          this.multidr = false;
          q.reject_remark='';
          //this.quotation=data;
          // this.search();
          //this.router.navigate([this.returnUrl]);
        },
        error => {
          this.selecteddrreqArr = [];
          // this.alertService.error(error);

        });
  }



  atir_request(q: { action: any; reject_remark: string; atir_status: any; }, status: string) {
    q.action = status;
    console.log('ati data',q);
    q.reject_remark = this.reject_remark;
    console.log('ati data remark',this.reject_remark);
    this.commonService.hideModal('modalatirejectrequest'); 
    this.quotationService.addSaveAtiRequest(q)
      .subscribe(
        data => {
          this.commonService.notify('info', 'Advance Tax Request Status Updated Successfully');
          // Approval

          //this.quotation=data;
          q.atir_status = status;
          
          this.atirmodel ={};
          this.reject_remark = '';
          //this.search();
          //this.router.navigate([this.returnUrl]);
        },
        error => {
          // this.alertService.error(error);

        });
  }
  getNoOfDR() {
    let count = 0;
    if (this.tabrows) {
      for (let i in this.tabrows) {
        const tabRow = this.tabrows[i] as any; // Type assertion
        if (tabRow.dr_status === 'pending' && tabRow.dr_to_user_id === this.commonService.getCurrentUser().id) {
          count++;
        }
      }
    }
    return count;
  }
  
  getInt(n: string) {
    return parseInt(n);
  }

  getFloat(n: string) {
    return parseFloat(n);
  }

  filterq(cat_type: any) {
    /* if(cat_type !=='all'){
     this.searchqf=cat_type;
     
     } else {
       this.searchqf='';
     } */

    this.search();
    /*
    let tempf =this.tempFilter; 
    switch(cat_type){
      case 'all':
      this.tabrows = this.tempFilter;
      break;
    
      case 'pending':
      //lc.cat_type === cat_type
      this.tabrows = tempf
      .filter((lc: any) => (lc.status==='pending'  ) );
      break;
    
      case 'paid':
      this.tabrows = tempf
      .filter((lc: any) => (lc.status==='paid'  ) );
      break;
    }
    
    */
  }

  dr_request_preapprove(q: { dr_discount: string | number; dr_comment: any; }) {
    let that = this;
    let disMsgStr;
    
    if (parseInt(q.dr_discount as string) >= 99)
      disMsgStr = ' Request of NOC';
    else
      disMsgStr = 'Discount Request of ' + q.dr_discount + '%?';
  
    swal.fire({
      title: disMsgStr,
      text: q.dr_comment,
      input: "number",
      inputValue: q.dr_discount.toString(), // Convert to string
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: 'gray',
      confirmButtonText: 'Approve',
      cancelButtonText: 'Ignore',
      buttonsStyling: false
    }).then(function (result: any) {
      console.log(result);
  
      if (result.value !== undefined && !isNaN(parseFloat(result.value)) && isFinite(result.value)) {
        const newValue = parseInt(result.value);
        
        if (newValue <= parseInt(q.dr_discount as string)) {
          q.dr_discount = newValue;
          that.dr_request(q, 'approve');
        } else {
          that.commonService.notify("error", 'Oops');
        }
      }
    });
  }

  atir_request_preapprove(q: { id: any; action: any; reject_remark: string; atir_status: any; }) {
    let that = this;
    Swal.fire({
        title: 'Advance Tax Invoice Request for PI #' + q.id + '?',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: 'gray',
        confirmButtonText: 'Approve',
        cancelButtonText: 'Ignore',
        buttonsStyling: false // You can remove this line if you're not customizing buttons' styles
    }).then((result: SweetAlertResult<any>) => {
        console.log(result);

        // True Confirmation    
        if (result.value) {
            that.atir_request(q, 'approve');
        }
    });
}


  // reject Ati model open
  atir_reject_module(row: any){
    this.atirmodel ={};
    this.atirmodel = row;
    this.commonService.openModal('modalatirejectrequest');
  }


   // Discount Ati model open
   discount_reject_module(row: {}){
    this.discountmodel ={};
    this.discountmodel = row;
    console.log(this.discountmodel);
    console.log(this.showdr);
    this.commonService.openModal('modaldiscountrejectrequest');
  }



  openChangePassword() {
    if (localStorage.getItem('defaultpassword') === '1') {
      this.commonService.notify('info', 'Please Change Password');

      this.commonService.openModal('modalchangepassword');
    }

  }

  markCancel(id: string) {
    let that = this;
    Swal.fire({
      title: 'Are you sure to cancel Application #' + id + '?',
      text: 'You will not be able to revert this action',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Cancel it!',
      cancelButtonText: 'No!',
      buttonsStyling: false // Remove buttonsStyling property if you don't have custom styling
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.quotationService.markCancel(id)
          .subscribe(
            data => {
              that.commonService.notify('info', 'Application #' + id + ' is cancelled');
              that.getList();
            },
            error => {
              // Handle error
            });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Do something if the cancel button is clicked
      }
    });
}

  // PI request reject 
  pir_request(q: { action: any; pir_status: any; }, status: string) {

    if (this.saveatiinprogress) {
      this.commonService.notify('info', 'Please Wait');
      return 0;
    }
    this.saveatiinprogress = true;
    q.action = status;
    this.quotationService.AddSavePIRequest(q)
      .subscribe(
        data => {
          this.saveatiinprogress = false;
          this.commonService.hideModal('modalviewpirequest');
          this.commonService.notify('info', 'Proforma Invoice Request Approval Status Updated Successfully');
          q.pir_status = status;

          //  this.search();
        },
        error => {
          this.saveatiinprogress = false;
          // this.alertService.error(error);

        });

    return undefined; // Return undefined at the end
}

   // Discount Ati model open
   pir_reject_module(row: {}){
    this.pirmodel ={};
    this.pirmodel = row;
    console.log(this.pirmodel);
    console.log(this.showdr);
    this.commonService.openModal('modalpirrejectrequest');
  }


  // showdiv
  showdiv() {
    //   if(show)
    this.show = !this.show;
    if (this.show) {

    } else {

    }
  }

  // view PIR Request view pi 
  pir_request_viewpi(row: { id: string; uuid: string; }) {
    this.rowid = row;
    this.show = false;
    this.showcheck = false;
    let Url = this.commonService.apiUrl + '/pg/?id=' + row.id + '&invoice=2&mis=1&uuid='+row.uuid;
    this.pirUrl = this.sanitizer.bypassSecurityTrustResourceUrl(Url);
    this.commonService.openModal('modalviewpirequest');
  }

  //  PI Request approve OR NOC Request
 

  


  pir_request_preapprove(q: { noc?: any; extended_pi?: any; id?: any; action?: any; pir_status?: any; }) {
      let piViewStr;
      if (q.noc == 0) { 
          piViewStr = 'Proforma Invoice Request for PI '; 
      } else if (q.noc == 1 && q.extended_pi == 0) { 
          piViewStr = 'Proforma Invoice Request for NOC '; 
      } else if (q.noc == 1 && q.extended_pi == 1) { 
          piViewStr = 'Proforma Invoice Request for Extended NOC '; 
      }
        
      let that = this;
      that.commonService.hideModal('modalviewpirequest');
  
      Swal.fire({
          title: piViewStr + q.id + '?',
          icon: 'info',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: 'gray',
          confirmButtonText: 'Approve',
          cancelButtonText: 'Ignore',
          customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-secondary'
          },
          buttonsStyling: false
      }).then((result: SweetAlertResult<any>) => {
          console.log(result);
  
          // True Confirmation    
          if (result.value) {
              // PI approve
              if (q.noc == 0) {
                  that.pir_request({ action: q.action, pir_status: q.pir_status }, 'approve');
              }
              // NOC approve
              if (q.noc == 1) {
                  that.dr_request({ action: q.action, pir_status: q.pir_status }, 'approve');
              }
          }
      });
  }
  

  //Reject PI Request approve OR NOC Request
  pir_noc_request_reject(q: { noc?: any; reject_remark?: any; action: any; pir_status: any; }, status: string) {
    console.log("reject q", q);
    console.log(q.noc);
    q.reject_remark = this.reject_remark;

    if(this.showdr =='pir'){
      this.commonService.hideModal('modalpirrejectrequest');
    }
    this.commonService.hideModal('modaldiscountrejectrequest'); 

    if (q) {
      // PI approve
      if (q.noc == 0) {
        this.pir_request(q, status);
      }
      // NOC approve
      if (q.noc == 1) {
        this.dr_request(q, status);
      }
    }
}


  private loadPeople3() {
    //console.log('loadin callaed');
    this.custTypeahead.pipe(
      tap(() => this.custLoading = true),
      distinctUntilChanged(),
      debounceTime(200),
      switchMap(term => this.customerService.search(term)),
    ).subscribe(x => {
      this.customers = x;
      this.custLoading = false;
      this.cd.markForCheck();
    }, () => {
      this.customers = [];
    });

  }

  public selecteddrreq(ev: { target: { checked: any; }; }, list: any[], row: any) {
    if (list) {

    } else {
      list = [];
    }
    //  if (ev.target.checked) {
    //   this.selecteddrreqArr.push(row);
    //  } else {
    //    let i = this.selecteddrreqArr.indexOf(row);
    //    this.selecteddrreqArr.splice(i, 1);
    //  }
    if (ev.target.checked) {
      list.push(row);
      this.selecteddrreqArr = list;
    } else {
      let i = list.indexOf(row);
      list.splice(i, 1);
      this.selecteddrreqArr = list;
    }
    console.log("discount Arrrr", this.selecteddrreqArr);
    console.log(list, this.model.permissions);
  }

  // showdiv
  showmultidrdiv() {
    this.showmultidr = !this.showmultidr;
  }

  // view discount Request 
  reviewmultipledr() {
    this.showmultidr = false;
    this.commonService.openModal('modalviewmultidrrequest');
  }
  Approveddrreq() {
    this.commonService.hideModal('modalviewmultidrrequest');
    if (this.selecteddrreqArr.length > 0) {
      for (let i = 0; i < this.selecteddrreqArr.length; i++) {
        const selectedDrReq = this.selecteddrreqArr[i] as any; // Type assertion
        if ((this.getInt(selectedDrReq.dr_discount) > 99 && this.commonService.getCurrentUser().nocapprover == 1) || (this.getInt(selectedDrReq.dr_discount) <= this.getInt(this.commonService.getCurrentUser().role.discount))) {
          this.dr_request(selectedDrReq, 'approve');
        }
      }
      this.selecteddrreqArr = [];
      this.model.permissions = [];
    }
  }
  
  forwarddrreq() {
    this.commonService.hideModal('modalviewmultidrrequest');
    if (this.selecteddrreqArr.length > 0) {
      for (let i = 0; i < this.selecteddrreqArr.length; i++) {
        const selectedDrReq = this.selecteddrreqArr[i] as any; // Type assertion
        if (this.getInt(selectedDrReq.dr_discount) > this.getInt(this.commonService.getCurrentUser().role.discount)) {
          this.dr_request(selectedDrReq, 'forward');
        }
      }
      this.selecteddrreqArr = [];
      this.model.permissions = [];
    }
  }
  
  rejectdrreq() {
    this.commonService.hideModal('modalviewmultidrrequest');
    if (this.selecteddrreqArr.length > 0) {
      for (let i = 0; i < this.selecteddrreqArr.length; i++) {
        this.dr_request(this.selecteddrreqArr[i], 'reject');
      }
      this.selecteddrreqArr = [];
      this.model.permissions = [];
    }
  }
  closedrmodel() {
    this.selecteddrreqArr = [];
    this.model.permissions = [];
    // this.multidr =false;  
    this.multidr = !this.multidr;
    // this.search();

  }
  check_includes(id: any) {
    if (this.model.permissions) {
      return this.model.permissions.includes(id);
    }
    else {
      return false;
    }

  }
  cpn_request_preapprove(q: { cpn_pan_no: string; }) {
    //    dr_request(row,'approve');
    let that = this;
    if(q.cpn_pan_no){
        var cpm_msg = 'Approve PAN number Change # ' + q.cpn_pan_no;
    } else {
        var cpm_msg = 'Approve No PAN number i.e: NOPAN1234Z';
    }
    Swal.fire({
        title: cpm_msg,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: 'gray',
        confirmButtonText: 'Approve',
        cancelButtonText: 'Ignore',
        buttonsStyling: false // Remove the buttonsStyling property
    }).then((result: SweetAlertResult<any>) => {
        console.log(result);

        // True Confirmation
        if (result.value) {
            that.cpn_request(q, 'approve');
        }
    });
}



  cpn_request(q: { cpn_pan_no?: string; action?: any; cpn_status?: any; }, status: string) {
    q.action = status;
    this.commonService.notify('info', 'Please Wait....');
    this.quotationService.addSaveCpnRequest(q)
      .subscribe(
        data => {

          this.commonService.notify('info', 'Customer No PAN  Request Status Updated Successfully');
          q.cpn_status = status;
          this.selecteddrreqArr = [];
        },
        error => {
          this.selecteddrreqArr = [];
          // this.alertService.error(error);

        });
  }


}
