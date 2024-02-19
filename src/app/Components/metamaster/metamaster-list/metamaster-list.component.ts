import {Component, OnInit, ViewChild} from '@angular/core';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import { distinctUntilChanged, debounceTime, switchMap, tap } from 'rxjs/operators';
import swal, { SweetAlertResult } from 'sweetalert2';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { MasterService } from '../../../Services/master.service';
import { AlertService } from '../../../Services/alert.service';
import { CommonService } from '../../../Services/common.service';
import { AuthService } from '../../../Services/auth.service';
import { QuotationService } from '../../../Services/quotation.service';
@Component({
  selector: 'app-metamaster-list',
  templateUrl: './metamaster-list.component.html',
  styleUrls: [
    './metamaster-list.component.scss',
    '../../../../assets/icon/icofont/css/icofont.scss'
  ]
})
export class MetamasterListComponent implements OnInit {
  rowsBasic = [];
  roflag=false;

  fullScreenRow = [];
  loadingIndicator = true;
  reorderable = true;
 
 customergroups:any;
 
  loading=false;
  rows = [];
  states = [];
  tabrows = [];
  expanded = {};
  timeout: any;
  rowsFilter = [];
  tempFilter = [];
  tempFilterCG = [];
  tabrowscg: { name: string }[] = [];

  searchq='';
  searchqf='';
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
  currentUser:any; 
  saveatiinprogress:Boolean=false;
/* customer={
    name:'',
    id:'',
    city:'',
    region:'',
    location:''
 }; */
 customer : any={};
 gststatecodes:any;
 metaeventvenuetag:any;
 metatypes:any;
 metaname:any;

  @ViewChild(DatatableComponent) table!: DatatableComponent;
  @ViewChild(DatatableComponent) tablecg!: DatatableComponent;

  constructor(public masterService: MasterService ,
      private alertService: AlertService,
      public commonService:CommonService,
      public authService:AuthService,
      public quotationService: QuotationService
  
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

    //this.getList();
   
this.getMetatypes();
this.geteventvenuetag();
  }

getMetatypes(){
  this.masterService.listmetatypes().subscribe(
    res => {
//      this.loading=false;       
    this.metatypes=res; 
        
    }
  );
}

geteventvenuetag(){

  this.masterService.listeventvenuetag().subscribe(
    res => {
//      this.loading=false;    
    console.log(res);   
    this.metaeventvenuetag=res; 
        
    }
  );

}


pageCallback(pageInfo: { count?: number, pageSize?: number, limit?: number, offset?: number }) {
  this.page.offset = pageInfo.offset ?? 0; // Using nullish coalescing operator to provide a default value if offset is undefined
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
 
  field_validate($event: { target: { value: string } }, cf: any, $object: any = null): 0 | undefined {
    let regexp: RegExp;
    let val: string = $event.target.value;
    if (val.length < 1) { return 0; }

    switch (cf) {
        case 'contact_email':
            regexp = /\S+@\S+\.\S+/;
            console.log(regexp.test(val));
            if (regexp.test(val)) {
                return undefined;
            } else {
                $event.target.value = '';
                $object = '';
                this.model.contact_email = '';
                this.commonService.notify('error', 'Invalid Email Address');
                return 0;
            }

        case 'mobile':
            regexp = /^([0-9]){10}$/;
            console.log(regexp.test(val));
            if (regexp.test(val)) {
                return undefined;
            } else {
                $event.target.value = '';
                $object = '';
                this.model.contact_no = '';
                this.commonService.notify('error', 'Invalid Mobile Number');
                return 0;
            }

        case 'pan':
            regexp = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}$/;
            console.log(regexp.test(val));
            if (regexp.test(val)) {
                return undefined;
            } else {
                $event.target.value = '';
                $object = '';
                this.model.pan = '';
                this.commonService.notify('error', 'Invalid PAN Number');
                return 0;
            }

        case 'gst':
            regexp = /^([0-9]){2}([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}([0-9]){1}([a-zA-Z1-9]){1}([a-zA-Z0-9]){1}$/;
            if (regexp.test(val)) {
                let statecode = '';
                //get current gst state
                if (this.model.state) {
                    let statecodeo = this.gststatecodes
                        .filter((lc: any) => lc.state.toString().toUpperCase() === this.model.state.toString().toUpperCase())[0];
                    if (statecodeo) {
                        statecode = statecodeo.statecode;
                    }
                }

                //get first 2 chars of GST
                let f2 = this.model.gst.toString().substring(0, 2);

                console.log(statecode, f2);

                if (statecode && f2 && statecode !== f2) {
                    this.model.gst = '';
                    this.commonService.notify('error', 'State & GST Number Mismatch');
                    return 0;
                } else {
                    return undefined;
                }
            } else {
                $event.target.value = '';
                $object = '';
                this.model.gst = '';
                this.commonService.notify('error', 'Invalid GST Number');
                return 0;
            }

        case 'tan':
            regexp = /^([a-zA-Z]){4}([0-9]){5}([a-zA-Z]){1}$/;
            if (regexp.test(val)) {
                return undefined;
            } else {
                $event.target.value = '';
                $object = '';
                this.model.tan = '';
                this.commonService.notify('error', 'Invalid TAN Number');
                return 0;
            }

        default:
            return undefined; // Add a return statement for the default case
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
    this.masterService.listmetamaster(params).subscribe(
			res => {
        this.loading=false; 
        this.page.count = res.count;
      this.tabrows=res.rows;  

      this.tempFilter = res;
     this.loadingIndicator=false;

    //  this.metaeventvenuetag= this.tabrows.filter(function(d) {
    //   return d.type== 'EVENTVENUETAG' ;
    // });
    //  console.log(this.metaeventvenuetag);
     
			}
    );
  }

  
  add() {

  }

  
  ngOnInit() {
    this.pageCallback({ offset: 0 });
  }

  search(){
    this.pageCallback({ offset: 0 });
  }


  // getCustomers
   

 
  


  addEditMetamaster($event: any) {
    if (this.saveatiinprogress) {
      this.commonService.notify('info', 'Please Wait');
      return 0;
    }

    this.saveatiinprogress=true;
    // this.alertService.notify('info', 'Module Not Available','Will be Available in next Build');
    this.masterService.addeditmetamaster(this.model).subscribe(res =>{
      this.saveatiinprogress=false;
      this.getList();
      this.commonService.hideModal('modaladdeditmetamaster');
      this.commonService.notify('info','Master Added / Edited Successfully');
    });

    // Return undefined if save is not in progress
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
  metamaster_delete(row: { name: string; id: string; }) {
    let that = this;
    Swal.fire({
        title: 'Are you sure to Master "' + row.name + '" ?',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Proceed to Delete',
        cancelButtonText: 'No, Cancel',
    }).then((result: SweetAlertResult<any>) => {
        // True Confirmation
        if (result.value) {
            let param = "id=" + row.id;
            that.masterService.deletemetamaster(param)
                .subscribe(
                    data => {
                        that.commonService.notify('info', 'MetaMaster Deleted Successfully');
                        that.getList();
                    },
                    error => {
                        // Handle error
                    });
        }
    });
}


  

}
