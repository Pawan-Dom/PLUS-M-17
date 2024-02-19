import { Component,OnDestroy, ViewChild, OnInit , ChangeDetectionStrategy, ChangeDetectorRef, ComponentFactoryResolver } from '@angular/core';
import { distinctUntilChanged, debounceTime, switchMap, tap } from 'rxjs/operators';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import { NotificationsService } from 'angular2-notifications';
import swal from 'sweetalert2';
import { Subject } from 'rxjs';
import {Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CustomerService } from '../../../Services/customer.service';
import { AlertService } from '../../../Services/alert.service';
import { CommonService } from '../../../Services/common.service';
import { AuthService } from '../../../Services/auth.service';
import { QuotationService } from '../../../Services/quotation.service';
import { MasterService } from '../../../Services/master.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: [
    './customer-list.component.scss',
    '../../../../assets/icon/icofont/css/icofont.scss'
  ]
})
export class CustomerListComponent implements OnInit {
  rowsBasic = [];
  roflag=false;
  roflag1=false;
  panVerified: boolean = false;
  fullScreenRow = [];
  loadingIndicator = true;
  reorderable = true;
  showVerifyButton: boolean = false;
  saveinprogress=false;
  
  

  custTypeaheadCity = new Subject<string>();
  cityLoading=false;
  isPanVerified: boolean = false;
  // At the top of your component class, declare the variable
isGSTVerified: boolean = false;


cities:any=[];
approvalStatus!: number ;
 customergroups:any;
 tabrowscg: { name: string }[] = [];
loading=false;
flag : boolean=false;
gflag : boolean=false;
  rows = [];
  tabrows = [];
  expanded = {};
  timeout: any;
  rowsFilter = [];
  tempFilter :any ;
  tempFilterCG = [];

  scustomers:any=[];
  scloading=false;

  searchq='';
searchqf='-3';
  page = {
    limit: 7,
    count: 0,
    offset: 0,
    orderBy: 'id',
    orderDir: 'desc'
  };

  selectedCustomer : any =[];
  selectedBranch : any = {};
  selectedRegion : any={};
  region : any=[];
   model:any={};
   modelcg:any={};
  row : any= []; 
  states:any=[];
  currentUser:any; 
/* customer={
    name:'',
    id:'',
    city:'',
    region:'',
    location:''
 }; */
 action=null;
 customer : any={};
 gststatecodes:any;
  @ViewChild(DatatableComponent) table!: DatatableComponent;
  @ViewChild(DatatableComponent) tablecg!: DatatableComponent;
  errorMessage: string="";
  gst_in_status: boolean=true;
  response: any;

  constructor(public customerService: CustomerService ,
      private alertService: AlertService,
      public commonService:CommonService,
      private cd: ChangeDetectorRef,
      public route:ActivatedRoute,
      public authService:AuthService,
      public quotationService: QuotationService,
      public masterService:MasterService,
      public router : Router,
      private http: HttpClient,
  
  ) {

    this.currentUser=this.commonService.getCurrentUser();
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


    this.route.params.subscribe(params => {
      console.log(params['action']);
        this.action=params['action'];
    });


    //this.getList();
    this.getCustomerGroupList();

  this.quotationService.genGststatecodes().subscribe(
    res => {
//      this.loading=false;       
this.gststatecodes=res;


this.states = res.filter((book: { hidden: number; }) => book.hidden == 0);    


    }
  );

  }



  loadCities(){
    this.custTypeaheadCity.pipe(
      tap(() => this.cityLoading = true),
      distinctUntilChanged(),
      debounceTime(200),
      switchMap(term => this.masterService.citysearch(term+'&state='+this.model.state)),
    ).subscribe(x => {
      this.cities = x;
      this.cityLoading = false;
      this.cd.markForCheck();
    }, () => {
      this.cities = [];
    });
  }

  pageCallback(pageInfo: { count?: number, pageSize?: number, limit?: number, offset?: number }) {
    this.page.offset = pageInfo.offset ?? this.page.offset;
    this.getList();
}


  filterq(cat_type: any){ 
   /* if(cat_type !=='all'){
    this.searchqf=cat_type; 
    } else {
      this.searchqf='';
    } */

    this.search();
  }

  //g
  getCustomerGroupList(){
    this.customerService.customergrouplist().subscribe(
      res => {
         this.customergroups=res;  
         this.tabrowscg=res;
         this.tempFilterCG = res;
      }
    );
  }

  field_validate($event: any, cf: string, $object: any = null): 0 | undefined {
    let regexp: any;
    let val: any = $event.target.value;
    if (val.length < 1) {
        return 0;
    }
    switch(cf){
        case 'contact_email':
            regexp = /\S+@\S+\.\S+/;
            console.log(regexp.test(val));
            if(regexp.test(val)){
                // Valid email
            } else {
                $event.target.value = '';
                $object = '';
                this.model.contact_email = '';
                this.commonService.notify('error', 'Invalid Email Address');
                return;
            }
            break;

        case 'mobile':
            regexp = /^([0-9]){10}$/;
            console.log(regexp.test(val));
            if(regexp.test(val)){
                // Valid mobile number
            } else {
                $event.target.value = '';
                $object = '';
                this.model.contact_no = '';
                this.commonService.notify('error', 'Invalid Mobile Number');
                return;
            }
            break;

        case 'pan':
            regexp = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}$/;
            console.log(regexp.test(val));
            if(regexp.test(val)){
                // Valid PAN number
            } else {
                $event.target.value = '';
                $object = '';
                this.model.pan = '';
                this.commonService.notify('error', 'Invalid PAN Number');
                return;
            }
            break;

        case 'gst':
            regexp = /^([0-9]){2}([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}([a-zA-Z1-9]){1}([a-zA-Z1-9]){1}([a-zA-Z0-9]){1}$/;
            if (this.currentUser.role.level < 2) {
                this.commonService.notify('info', 'GST Validation Enforcement is disabled For Admin');
                return;
            } else if(regexp.test(val)){
                this.isGSTVerified = false;
                let statecode ='';
                //get current gst state
                if(this.model.state){
                    let statecodeo = this.gststatecodes
                    .filter((lc: any) => lc.state.toString().toUpperCase() === this.model.state.toString().toUpperCase())[0];
                    if(statecodeo){
                        statecode=statecodeo.statecode;
                    }
                }
                //get first 2 chars of GST
                let f2=this.model.gst.toString().substring(0,2);
                console.log(statecode,f2);
                if(statecode && f2){
                    if(statecode===f2){
                        // State and GST match
                    } else {
                        this.model.gst='';
                        this.commonService.notify('error','State & GST Number Mismatch');
                        return;
                    }
                } else {
                    this.model.gst='';
                    this.commonService.notify('error','State & GST Number Mismatch');
                    return;
                }
            } else {
                $event.target.value = '';
                $object = '';
                this.model.gst = '';
                this.commonService.notify('error', 'Invalid GST Number');
                return;
            }
            break;

        case 'tan':
            regexp = /^([a-zA-Z]){4}([0-9]){5}([a-zA-Z]){1}$/;
            if(regexp.test(val)){
                // Valid TAN number
            } else {
                $event.target.value = '';
                $object = '';
                this.model.tan = '';
                this.commonService.notify('error', 'Invalid TAN Number');
                return;
            }
            break;
    }
    return; // Ensure a return statement for all code paths
}

  getPincodeinfo(){
    console.log(this.model.pincode.toString().length);
    if(  this.model.pincode.toString().length > 5){
    this.quotationService.getPincodeinfo(this.model.pincode)
    .subscribe(
      data => {
        if(data){
        this.model.state=data.state;
        this.model.city=data.district;
        this.model.address_line_3=data.locality;
        this.model.country='India';
        }
       //this.getList();
       // this.search();
        
      },
      error => {
          // this.alertService.error(error);
       //   this.loading = false;
      });
    }
  }
  


  // getCustomers
  getList(){
  
    console.log(this.searchqf);
    let params="pageoffset="+this.page.offset;
    params=params+'&limit='+this.page.limit;


  if(this.searchq.toString().length>1){
      params=params+'&searchq='+this.searchq;
  }
  if(this.searchqf.toString().length>0){
    params=params+'&searchqf='+this.searchqf;
}


    this.loadingIndicator=true;

   this.loading=true;
    this.customerService.list(params).subscribe(
			res => {
        this.loading=false; 
        this.page.count = res.count;
      this.tabrows=res.rows;  

      this.tempFilter = res;
     this.loadingIndicator=false;


     
			}
    );
  }
view(row: { name: string }) {
  console.log('View clicked:', row.name);
  // You can perform further actions based on the clicked row
}


  checksimilar(row: { pan: string; id: string; name: string; }){
    this.scloading=true;
    let params='';
    if(row.pan){
      params=row.pan+'&deepsearch=1&id='+row.id;

    }else {
//      this.scloading=false;
  params=row.name+'&deepsearch=1&id='+row.id;
//  this.commonService.
  //    return 0;   
    }
    this.customerService.search(params).subscribe(
			res => {
        this.scloading=false;
        this.scustomers=res;
			}
    );
  }
  
  add() {

  }

  
  ngOnInit() {
    this.pageCallback({ offset: 0 });
    this.loadCities();

    if(this.action){
      setTimeout(() => { 
        if(this.authService.checkPermission(14)){
        this.model={};this.model.country='India';
        this.commonService.showModal('modaladdeditcustomer');
        }
      }, 2000);
    }
  }

  search(){
    this.pageCallback({ offset: 0 });
  }


  // getCustomers
   

 
 
  addEditCustomerGroup(){
    // this.alertService.notify('info', 'Module Not Available','Will be Available in next Build');
 this.customerService.addeditcustomergroup(this.modelcg).subscribe(res =>{
  this.getCustomerGroupList();
  this.commonService.notify('info','Group Added / Edited Successfully');
  this.commonService.hideModal('modaladdeditgroup');
    });
   }

     

   addEditCustomer() {
    if (this.model.pan && !this.isPanValid(this.model.pan)) {
        this.commonService.notify('error', 'Invalid PAN');
        return undefined;
    }
    if (this.flag) {
        // this.model.pan=null;
        this.commonService.notify('error', 'Invalid PAN');
        return undefined;
    }
    if (this.gflag) {
        // this.model.pan=null;
        this.commonService.notify('error', 'Invalid GST');
        return undefined;
    }
    if (this.model.gst && this.isGSTVerified) {
        if (this.response.legal_name_of_business != this.model.name) {
            this.commonService.notify('error', 'Customer Name does not Match with legal business name');
            return undefined;
        }
    }
    // this.alertService.notify('info', 'Module Not Available','Will be Available in next Build');
    if (this.model.pincode.toString().length == 6) {
        if (this.saveinprogress) {
            this.commonService.notify('Error', 'Please Wait');
            return undefined;
        }
        this.saveinprogress = true;
        this.customerService.addeditcustomer(this.model).subscribe(
            res => {
                this.getList();
                this.saveinprogress = false;
                this.commonService.hideModal('modaladdeditcustomer');
                if (this.model.approved == 1) {
                    swal.fire(
                        'Approved !',
                        'Customer Added Successfully',
                        'success'
                    );
                }
                if (this.model.approved == 0) {
                    swal.fire(
                        'Pending Approval !',
                        'Customer Information is Submitted for verification , You will be able create PI After Approval for same.',
                        'info'
                    );
                }
                this.commonService.notify('info', 'Customer Added / Edited Successfully');
            },
            error => {
                this.saveinprogress = false;
                // this.alertService.error(error);
            }
        );
    } else {
        this.commonService.notify('error', 'Pin Code Number must be 6 digit');
    }
    return undefined;
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


  updateFilter(event: { target: { value: string; }; }) {
    console.log('called');
    let tempf =this.tempFilter;
    const val = event.target.value.toLowerCase();
   
    // filter our data
    const temp = tempf.filter(function(d: { name: string; }) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.tabrows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }
  updateFilterCG(event: KeyboardEvent) {
    console.log('called');
    let tempf: { name: string }[] = this.tempFilterCG; // Specify the type explicitly
  
    const val = (event.target as HTMLInputElement).value.toLowerCase();
  
    // filter our data
    const temp = tempf.filter(function(d) {
      // Assuming `d` is an object with a `name` property
      return (d.name as string).toLowerCase().indexOf(val) !== -1 || !val;
    });
  
    // update the rows
    this.tabrowscg = temp;
    // Whenever the filter changes, always go back to the first page
    this.tablecg.offset = 0;
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
  openSuccessCancelSwal() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You not be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger mr-sm'
      }
    }).then((result: any) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
      } else if (result.dismiss) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        );
      }
    });
  }
  
  customer_approvereject(row: any, approved = 1, ref_customer_id = 0) {
    let message = 'Approve';

    if (approved == -1) {
        message = 'Reject';
    }
    let that = this;

    Swal.fire({
        title: 'Are you sure?',
        text: '',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Do it!',
        cancelButtonText: 'No, cancel!',
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger mr-sm'
        }
    }).then((result) => {
        if (result.value) {
            // It's actually approving/disapproving the current request
            if (approved == 1 || true) {
                that.model = row;
                that.model.approved = approved;
                that.model.ref_customer_id = ref_customer_id;
                that.addEditCustomer();
            }
            that.commonService.notify('info', 'Customer Info Updated');
        }
    });
}



  onPanChange() {

    if(this.model.pan.includes('NOPAN') || this.model.pan.length !=10){
      this.showVerifyButton =false;
    }else{
      this.showVerifyButton=true;
    }
      
    this.isPanVerified = false;
    
     // Reset isPanVerified to false when PAN is changed
    this.model.approved=0;
    this.model.approved_by= null;
    this.model.ispanverified=false;
    this.flag=false;

}
onGSTChange() {
  if (this.model.gst.length === 0) {
    this.showVerifyButton = false;
  } else {
    // Validate GST format before setting isGSTVerified to true
    if (this.isGSTFormatValid(this.model.gst)) {
      // this.isGSTVerified = true;
    } else {
      this.isGSTVerified = false;
      this.commonService.notify('error', 'Invalid GST Format'); // Display an error message
      // You can also reset the GST value to empty if needed
      this.model.gst = null;
      this.gst_in_status=false;
      this.errorMessage!=null;
      this.response=null;
    }
  }
  
  // Reset any other related properties if needed
}



  
  isPanValid(pan: string): boolean {
    // Perform your PAN number validation logic here
    // Return true if the PAN number is valid, otherwise return false
    
    // Example PAN validation logic (you can modify this according to your validation requirements)
    const panRegex = /[A-Z]{5}[0-9]{4}[A-Z]{1}/; // Example PAN regex pattern
   
    return panRegex.test(pan);
  }

//verify GST method start
verifyGST() {
  const gst = this.model.gst;

  // Validate GST format before making the API call
  if (this.isGSTFormatValid(this.model.gst)) {
    const parameters = {
      "gst": this.model.gst,
      "user_id": this.currentUser.id,
      "src": this.currentUser.src
    };

    console.log(parameters, 'parameters');

    // Make an HTTP POST request to the GST verification API endpoint with parameters
    this.http.post<any>('https://api-v1-dev.pplplus.org/Verification/GST', parameters)
      .subscribe(
        response => {
          // Handle the API response here
          console.log('GST verification response:', response);

          // Check if GST verification is successful (assuming 'gst_in_status' is the key from the response)
          if (response.gst_in_status === 'Active') {
            if (response.legal_name_of_business === this.model.name) {
              this.isGSTVerified = true; 
              this.response = response;// Set the flag to true for showing the green tick mark
              this.gflag = false;
            } else {
              this.isGSTVerified = false; // Set the flag to false to hide the green tick mark
              this.commonService.notify('error', 'Customer name does not match with GST business name kindly enter valid Legal Name of Business.'); // Display error message
              this.gflag = true;
              this.errorMessage = `Legal Name of Business: ${response.legal_name_of_business}`;
            }
          } else {
            this.isGSTVerified = false; // Set the flag to false to hide the green tick mark
            this.commonService.notify('error', response.message);
            this.gflag = true;
          }
        },
        error => {
          // Handle any errors that occurred during the API request
          console.error('Error verifying GST:', error);
          this.isGSTVerified = false; // Set the flag to false to hide the green tick mark in case of an error
        }
      );
  } else {
    // Show an error message for invalid GST format
    this.commonService.notify('error', 'Invalid GST Format');
  }
}




// GST format validation function
isGSTFormatValid(gst: string): boolean {
  // Define your GST format validation logic here
  // Return true if GST format is valid, otherwise false
  // Example: You can use a regular expression for validation
  const gstFormatRegExp = /^([0-9]){2}([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}([a-zA-Z1-9]){1}([a-zA-Z1-9]){1}([a-zA-Z0-9]){1}$/;
  return gstFormatRegExp.test(gst);
}

// for hide the verify button method start



// verify GST method end



  verifyPAN() {
     
   const pan = this.model.pan;
    
    
    const parameters = {
    "pan":this.model.pan,
   "user_id":this.currentUser.id,
   "src":this.currentUser.src
    };

    console.log(parameters,'parameters');
    
    // Make an HTTP POST request to the PAN verification API endpoint with parameters
     this.http.post<any>('https://api-v1-dev.pplplus.org/Verification/Pan', parameters)
        .subscribe(
            response => {
                // Handle the API response here
                console.log('PAN verification response:', response);

                // Set 'panVerified' to true if pan_status is "VALID"
                response.pan_status === 'VALID';
                if (response.pan_status === 'VALID') {
                    this.model.approved = 1;
                    this.model.approved_by = this.currentUser.id;
                    
                    this.isPanVerified = true;
                    this.model.ispanverified= this.isPanVerified;
                } else {
                    // Show an alert with the invalid PAN message
                    // alert('Invalid PAN. Please enter a valid PAN.');
                    this.showVerifyButton = !this.isPanVerified;
                    this.commonService.notify('error',response.message);
                    this.flag=true;
                }

                // Hide the "Verify PAN" button if the PAN is verified
                
            },
            error => {
                // Handle any errors that occurred during the API request
                console.error('Error verifying PAN:', error);
            }

      );
    }
  
  // gotoQuotationAdd
  gotoQuotationAdd(customerData: any){
    this.commonService.setCurrentCustomer(customerData);
    this.router.navigate(['/quotation/add']);
  }
  

  // search customer pi
  gotoQuotationSearch(searchCust: { id: any; }){
    this.commonService.setSearchCustomer(searchCust);
    this.router.navigate(['/quotation/search/',searchCust.id]); 
  }

  checkPincodelength(){
    console.log(this.model.pincode.toString().length);
    if(this.model.pincode.toString().length == 6){
    console.log(this.model.pincode.toString().length , this.model.pincode )

    }else{
      this.commonService.notify('error','Pin Code Number must be 6 digit');
    }

  }

}
