import {Component, OnInit , ViewChild } from '@angular/core';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import { HttpClient, HttpParams } from '@angular/common/http';
import swal, { SweetAlertResult } from 'sweetalert2';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';
import { UserService } from '../../../Services/user.service';
import { CommonService } from '../../../Services/common.service';
import { QuotationService } from '../../../Services/quotation.service';
@Component({
  selector: 'app-creditnote-list',
  templateUrl: './creditnote-list.component.html',
  styleUrls: [
    './creditnote-list.component.scss',
    '../../../../assets/icon/icofont/css/icofont.scss'
  ]
})
export class CreditnoteListComponent implements OnInit  {
  rowsBasic = [];
  fullScreenRow = [];
  loadingIndicator = false;
  reorderable = true;
  rows = [];
  roflag=false;

  showdr='';
  showatir='';
  tabrows!: [];
  expanded = {};
  timeout: any;
  rowsFilter = [];
  tempFilter = [];
  qd:any=[];
searchq!:string;
searchqf!:string;
// searchquserf='All';
// searchqregionf='All';
searchquserf!:string;
searchqregionf!: string;
searchqsubregionf!:string;
users:any;
  page :any = {
    limit: 7,
    count: 0,
    offset: 0,
 
    orderBy: 'id',
    orderDir: 'desc'
  };
currentUser:any;
  /*filterq:any;
  filteruserq:any;
  filterregionq:any;*/

  @ViewChild(DatatableComponent) table!: DatatableComponent;
  
  region_ids: any;
getNoOfDR: any;

  constructor(public authService:AuthService,public userService:UserService,public route : ActivatedRoute,public commonService:CommonService,public quotationService: QuotationService,public router : Router) {
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
 
   this.route.params.subscribe(params => {
    console.log(params['show']);
    this.showdr=params['show'];
    if(params['q']){
    this.searchq=params['q'];
    }

    
  });
      this.currentUser=this.commonService.getCurrentUser();
      this.getUsers();
      this.motherRegion();
      this.pageCallback({ offset: 0 });
  }
  getUsers() {
    const usersData = sessionStorage.getItem('users');

    if (usersData !== null) {
        this.users = JSON.parse(usersData);
    } else {
        this.userService.list().subscribe(
            res => {
                // this.loading = false;
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
  getList(){

/*    const params = new HttpParams()
    .set('orderColumn', `${this.page.orderBy}`)
    .set('orderDir', `${this.page.orderDir}`)
    .set('pageNumber', `${this.page.offset}`)
    .set('pageSize', `${this.page.limit}`); */
  let params="pageoffset="+this.page.offset;
  params=params+'&limit='+this.page.limit;


  if(this.searchq){
      params=params+'&searchq='+this.searchq;
  }
 // if(this.searchqf.tolength>1){
  if(this.searchqf) {
   params=params+'&searchqf='+this.searchqf;}

   if(this.searchquserf) { params=params+'&searchquserf='+this.searchquserf;}
   if(this.searchqregionf) {  params=params+'&searchqregionf='+this.searchqregionf;}
//}
if(this.showdr){
    params=params+'&showdr='+this.showdr; 
}

if (this.searchqsubregionf) { params = params + '&searchqsubregionf=' + this.searchqsubregionf; }

 


    this.loadingIndicator=true;
   let tr=[];
    this.quotationService.creditnotelist(params).subscribe(
			res => {
        
        this.page.count = res.count;
        this.page.approver_user=res.approver_user;
      this.tabrows=res.rows;  
      this.tempFilter = res;
     this.loadingIndicator=false;
			}
    );
  }

  view(row: any) {
console.log(row);
  }

  edit(row: { id: string; uuid: string; }) {
    this.router.navigate(['/quotation/view'+row.id+'/'+row.uuid]); 
  }

  delete(row: any) {
  }
  
  add() {

  }

  ngOnInit() {
    
    let that=this;
    setTimeout(function(){that.openChangePassword();},5000);
  }

  search(){
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


  dr_request(q: { action: any; },status: string){
 q.action=status;
 
 
    this.quotationService.addSaveDiscountRequest(q)
    .subscribe(
        data => {
          this.commonService.notify('info', 'Discount Approval Status Updated Successfully');
          
          //this.quotation=data;
          this.search();
          //this.router.navigate([this.returnUrl]);
        },
        error => {
            // this.alertService.error(error);
            
        });
  }



  atir_request(q: { action: any; },status: string){
    q.action=status;
    
    
       this.quotationService.addSaveAtiRequest(q)
       .subscribe(
           data => {
             this.commonService.notify('info', 'Advance Tax Request Approval Status Updated Successfully');
             
             //this.quotation=data;
             this.search();
             //this.router.navigate([this.returnUrl]);
           },
           error => {
               // this.alertService.error(error);
               
           });
     }


  // getNoOfDR(){
  //   let count=0;
  //   if(this.tabrows){
  //      for(let i in this.tabrows){
  //             if(this.tabrows[i].dr_status==='pending' && this.tabrows[i].dr_to_user_id===this.commonService.getCurrentUser().id){
  //               count++;
  //             }
  //      }
  //   }
  //   return count;
  // }

  getInt(n: string){
  return parseInt(n);
  }

  filterq(cat_type: any){ 
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

  dr_request_preapprove(q: { dr_discount?: any; dr_comment?: any; action: any; }) {
    let that = this;
    Swal.fire({
        title: 'Discount Request of ' + q.dr_discount + '%?',
        text: q.dr_comment,
        input: 'number',
        inputValue: q.dr_discount,
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
    }).then((result: any) => {
        console.log(result);

        // True Confirmation    
        if (result.value) {
            if (parseInt(result.value) <= parseInt(q.dr_discount)) {
                q.dr_discount = result.value;
                that.dr_request(q, 'approve');
            } else {
                that.commonService.notify('error', 'Oops');
            }
        }
    });
}


atir_request_preapprove(q: { id?: any; action?: any; }) {
  let that = this;
  Swal.fire({
      title: 'Advance Tax Invoice Request for PI #' + q.id + '?',
      icon: 'info', // Use 'icon' instead of 'type'
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: 'gray',
      confirmButtonText: 'Approve',
      cancelButtonText: 'Ignore',
      customClass: { // Use customClass instead of confirmButtonClass and cancelButtonClass
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-secondary'
      },
      buttonsStyling: false
  }).then((result: SweetAlertResult<any>) => {
      console.log(result);

      // True Confirmation    
      if (result.value) {
          that.atir_request({ ...q, action: 'approve' }, 'someStatus'); // Provide both arguments
      }
  });
}


      openChangePassword(){
        if(localStorage.getItem('defaultpassword')==='1'){
         this.commonService.notify('info','Please Change Password');
             
             this.commonService.openModal('modalchangepassword');
        }
   
      }


      markCancel(id: string) {
        let that = this;
        swal.fire({
          title: 'Are you sure to cancel Creditnote #' + id + '?',
          text: 'You will not be able to revert this action',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, Cancel it!',
          cancelButtonText: 'No !'
        }).then((result) => {
          if (result.isConfirmed) {
            this.quotationService.markCancel(id)
              .subscribe(
                data => {
                  that.commonService.notify('info', 'Creditnote #' + id + ' is cancelled');
                  that.getList();
                  //this.router.navigate([this.returnUrl]);
                },
                error => {
                  // this.alertService.error(error);
                });
          } else if (result.dismiss === swal.DismissReason.cancel) {
            // Handle cancel action
          }
        });
      }
}
