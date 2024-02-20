import { Component, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { HttpClient, HttpParams } from '@angular/common/http';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { distinctUntilChanged, debounceTime, switchMap, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthService } from '../../../Services/auth.service';
import { UserService } from '../../../Services/user.service';
import { CommonService } from '../../../Services/common.service';
import { QuotationService } from '../../../Services/quotation.service';
import { MasterService } from '../../../Services/master.service';
import { CustomerService } from '../../../Services/customer.service';
@Component({
  selector: 'app-license-list',
  templateUrl: './license-list.component.html',
  styleUrls: [
    './license-list.component.scss',
    '../../../../assets/icon/icofont/css/icofont.scss'
  ]
})
export class LicenseListComponent implements OnInit {
  rowsBasic = [];
  roflag=false;

  fullScreenRow = [];
  loadingIndicator = false;
  reorderable = true;
  rows = [];
  showdr = '';
  showatir = '';
  tabrows = [];
  expanded = {};
  timeout: any;
  rowsFilter = [];
  tempFilter = [];
  qd: any = [];
  searchq!: string;
  searchqf!: string;
  searchquserf!:string;
  //searchqregionf = 'All';
  searchqregionf! :string;
  searchqeventtypef! :string;
  searchqeventvenuef! :string;
  searchqcustomerf! :string;
  searchqeventnamef! :string;
  searchqend_date :any;
  searchqstart_date: any;
  searchqsubregionf:any;

  searchqs!: string;
  users: any;

  eventtypes: any = [];
 

  states: any = [];
  pickuplocations: any = [];
  customers: any=[];
  venues: any=[];
  eventvenue: any=[];
  eventnames :any=[];

  custTypeahead = new Subject<string>();
  custTypeaheadVenue = new Subject<string>();
  custTypeaheadEventtypes = new Subject<string>();
  custTypeaheadEventname = new Subject<string>();

  custLoading = false;
  eventnameLoading = false;
  venueLoading = false;
  eventtypeLoading = false;
  loading=false;
  
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
  region_ids:any;

  @ViewChild(DatatableComponent) table!: DatatableComponent;

  constructor(public authService: AuthService, public userService: UserService, 
    public route: ActivatedRoute, 
    public commonService: CommonService, 
    public quotationService: QuotationService, 
    public router: Router,
    public masterService: MasterService,
    public customerService: CustomerService,
    private cd: ChangeDetectorRef) {
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

    //  this.getList();

    this.route.params.subscribe(params => {
      console.log(params['show']);
      this.showdr = params['show'];
      if (params['q']) {
        this.searchq = params['q'];
      }
    });
    this.currentUser = this.commonService.getCurrentUser();
    this.getUsers();
    this.motherRegion();
    this.loadPeople3();
    this.pageCallback({ offset: 0 });
  }
  getUsers() {
    const usersData = sessionStorage.getItem('users');

    if (usersData !== null) {
        this.users = JSON.parse(usersData);
    } else {
        this.userService.list().subscribe(
            res => { 
                this.users = res;
                sessionStorage.setItem('users', JSON.stringify(res));
            }
        );
    }
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

  pageCallback(pageInfo: { count?: number, pageSize?: number, limit?: number, offset?: number }) {
    this.page.offset = pageInfo.offset;
    this.getList();
  }

  // getCustomers
  getList() {

    /*    const params = new HttpParams()
        .set('orderColumn', `${this.page.orderBy}`)
        .set('orderDir', `${this.page.orderDir}`)
        .set('pageNumber', `${this.page.offset}`)
        .set('pageSize', `${this.page.limit}`); */
    let params = 'pageoffset=' + this.page.offset;
    params = params + '&limit=' + this.page.limit;

    if (this.searchq){params = params + '&searchq=' + encodeURIComponent(this.searchq);}
    if (this.searchqs){params = params + '&searchqs=' + this.searchqs;}
    if (this.searchqf){params = params + '&searchqf=' + this.searchqf;}
    if (this.searchquserf){ params = params + '&searchquserf=' + this.searchquserf; }
    if (this.searchqregionf) { params = params + '&searchqregionf=' + this.searchqregionf; }
    // event type
    if (this.searchqeventtypef) { params = params + '&searchqeventtypef=' + this.searchqeventtypef; }
    // event venue
    if (this.searchqeventvenuef) { params = params + '&searchqeventvenuef=' + this.searchqeventvenuef; }
    // select customer
    if (this.searchqcustomerf) { params = params + '&searchqcustomerf=' + this.searchqcustomerf; }
    //search start_date
    if (this.searchqstart_date) { params = params + '&searchqstart_date=' + this.searchqstart_date; }
    // select search end_date
    if (this.searchqend_date) { params = params + '&searchqend_date=' + this.searchqend_date; } 
    //search
    if (this.showdr) { params = params + '&showdr=' + this.showdr;}
    //searchqeventnamef
    if (this.searchqeventnamef) { params = params + '&searchqeventnamef=' + this.searchqeventnamef; }
    if (this.searchqsubregionf) { params = params + '&searchqsubregionf=' + this.searchqsubregionf; }
    this.loadingIndicator = true;
    let tr = [];

    // this.quotationService.list(params).subscribe(
    this.quotationService.licenselist(params).subscribe(
      res => {

        this.page.count = res.count;
        this.page.approver_user = res.approver_user;
        this.tabrows = res.rows;
        this.tempFilter = res;
        this.loadingIndicator = false;
      }
    );
  }

  ngOnInit() {
    let that = this;
    this.loadPeople3();
  }

  search() {
    this.pageCallback({ offset: 0 });
  }

  getInt(n: string) {
    return parseInt(n);
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


    this.custTypeaheadEventtypes.pipe(
      tap(() => this.eventtypeLoading = true),
      distinctUntilChanged(),
      debounceTime(200),
      switchMap(term => this.masterService.metasearch(term, 'EVENTTYPE')),
    ).subscribe(x => {
      this.eventtypes = x;
      this.eventtypeLoading = false;
      this.cd.markForCheck();
    }, () => {
      this.eventtypes = [];
    });

    this.custTypeaheadVenue.pipe(
      tap(() => this.venueLoading = true),
      distinctUntilChanged(),
      debounceTime(200),
      switchMap(term => this.masterService.metasearch(term, 'EVENTVENUE')),
    ).subscribe(x => {
      this.venues = x;
      this.venueLoading = false;
      this.cd.markForCheck();
    }, () => {
      this.venues = [];
    });

    // searcheventname
    this.custTypeaheadEventname.pipe(
      tap(() => this.eventnameLoading = true),
      distinctUntilChanged(),
      debounceTime(200),
      switchMap(term => this.masterService.searcheventname(term)),
    ).subscribe(x => {
      this.eventnames = x;
      this.eventnameLoading = false;
      this.cd.markForCheck();
    }, () => {
      this.eventnames = [];
    });
  }

  // 
  downloadlicsearchdata() {
    let params = 'pageoffset=' + this.page.offset;
    if (this.searchq) { params = params + '&searchq=' + encodeURIComponent(this.searchq); }
    if (this.searchqs) { params = params + '&searchqs=' + this.searchqs; }
    if (this.searchqf) { params = params + '&searchqf=' + this.searchqf; }
    if (this.searchquserf) { params = params + '&searchquserf=' + this.searchquserf; }
    if (this.searchqregionf) { params = params + '&searchqregionf=' + this.searchqregionf; }
    if (this.searchqeventtypef) { params = params + '&searchqeventtypef=' + this.searchqeventtypef; }
    if (this.searchqeventvenuef) { params = params + '&searchqeventvenuef=' + this.searchqeventvenuef; }
    if (this.searchqcustomerf) { params = params + '&searchqcustomerf=' + this.searchqcustomerf; }
    if (this.searchqstart_date) { params = params + '&searchqstart_date=' + this.searchqstart_date; }
    if (this.searchqend_date) { params = params + '&searchqend_date=' + this.searchqend_date; }
    if (this.showdr) { params = params + '&showdr=' + this.showdr; }
    if (this.searchqeventnamef) { params = params + '&searchqeventnamef=' + this.searchqeventnamef; }

    if (this.searchqstart_date && this.searchqend_date) {
        if (this.loading) {
            return 0;
        }
        this.loading = true;
        return this.quotationService.licensedwllist(params).subscribe(
            res => {
                console.log("res:", res);
                this.loading = false;
                this.commonService.notify('info', 'Report Generated');
                window.open(res['file_url'], '_blank');
            },
            error => {
                this.loading = false;
            }
        );
    } else {
        this.commonService.notify('error', 'Please select Start date and End date');
        return 0;
    }
}



  // Create Renewal PI start 
  // createRenewalPi(row) {
  //   let that = this;
  //   let model:any={}; 
  //   model.quotation_id=row.quotation_id;
  //   model.id=row.id;
   
  //   swal({
  //     title: 'Are you sure?',
  //     text: "This will automatically create new PI for Renewal with all items in Prev Quotation with respective period"   ,
  //     type: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: 'gray',
  //     confirmButtonText: 'Yes, Create New PI!',
  //     cancelButtonText: 'No, cancel!',
  //     confirmButtonClass: 'btn btn-success',
  //     cancelButtonClass: 'btn btn-danger',
  //     buttonsStyling: false

  //   }).then(function (result) {
  //     console.log(result); 
  //     if (result.value) {
  //       that.quotationService.createrenewalpi(model).subscribe(res =>{
  //         console.log('create pi row id', row);
  //         that.commonService.notify('info','New PI Created Successfully'); 
  //         row.renewal_pi_id=res.id;
  //         that.getList();
  //        });
  //     }

  //   });

  // }

  // renewal PI function end

}
