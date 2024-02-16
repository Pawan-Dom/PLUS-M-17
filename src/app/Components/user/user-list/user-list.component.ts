import { Component, OnDestroy, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { distinctUntilChanged, debounceTime, switchMap, tap } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { SharedModule } from '../../../shared/shared.module';
import { ModalAnimationComponent } from '../../../shared/modal-animation/modal-animation.component';
import { CardComponent } from 'ngx-charts';
import { AuthService } from '../../../Services/auth.service';
import { AlertService } from '../../../Services/alert.service';
import { UserService } from '../../../Services/user.service';
import { CustomerService } from '../../../Services/customer.service';
import { RoleService } from '../../../Services/role.service';
import { CommonService } from '../../../Services/common.service';
import { MasterService } from '../../../Services/master.service';
import { BranchService } from '../../../Services/branches.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss',    '../../../../assets/icon/icofont/css/icofont.scss'
],
  changeDetection: ChangeDetectionStrategy.OnPush // Optionally, if you want to enable OnPush change detection
})

export class UserListComponent implements OnInit {
  rowsBasic = [];
  roflag=false;
  fullScreenRow = [];
  loading=false;
  loadingIndicator = true;
  reorderable = true;
  selectedUser: any ={};
  selectedRole: any = [];
  selectedRegion: any = [];
  users: any;
  region: any;
  branches:any;
  reportingtorows:any;
  regionalreportingrows: any;
  rows = [];
  tabrows = [];
  expanded = {};
  timeout: any;
  frzrows: { user_id: number; email: string; mobile: string; }[] = [];

  rowsFilter = [];
  tempFilter = [];

  user: any={};

  custTypeaheadCity = new Subject<string>();
  cityLoading=false;

  cities:any=[];
  region_ids:any=[];

  @ViewChild(DatatableComponent) table!: DatatableComponent;
  childregions: any;
  selectedCustomer: any;

  constructor(public authService:AuthService, public userService: UserService, public branchService: BranchService, private cd: ChangeDetectorRef,
     public customerService: CustomerService, public commonService: CommonService, private roleService: RoleService,
    public masterService:MasterService,private route: ActivatedRoute) {
    this.getData();
    this.motherRegion();
    this.selectedRole=this.commonService.getCurrentRole();
    this.selectedRegion=this.commonService.getCurrentRegion();
    this.getfreezuserList();
  }

  ngOnInit() {
    this.motherRegion();
    this.loadPeople3();
    this.getList();
    this.loadCities();
  }

  custLoading = false;
  custTypeahead = new Subject<string>();
  roles: any=[];

  loadCities(){
    this.custTypeaheadCity.pipe(
      tap(() => this.cityLoading = true),
      distinctUntilChanged(),
      debounceTime(200),
      switchMap(term => this.masterService.citysearch(term+'&state=all')),
    ).subscribe(x => {
      this.cities = x;
      this.cityLoading = false;
      this.cd.markForCheck();
    }, () => {
      this.cities = [];
    });
  }

  motherRegion(){
    let tr=[];
    this.loading=true;
    this.userService.motherchildregion().subscribe(
      res => {
        if(res.length>0){
          this.region_ids= res;
        }  
      }
    );
  }

  getList(){
    let tr=[];
    this.loading=true;
    this.userService.list().subscribe(
      res => {
        this.loading=false;
        this.tabrows=res; 
        this.reportingtorows=res; 
        this.tempFilter=res;

        this.regionalreportingrows=res.filter((ul: any) => ul.role.id == 81);
        console.log('all regional user list',this.regionalreportingrows);
      }
    );
  }

  view(row: any) {
   console.log(row);
  }

  editUser(row: any) {
    console.log("Editing user:", row);
    // Assign the selected user data to this.selectedUser
    this.selectedUser = this.commonService.cloneWR(row);
    console.log("Selected user for editing:", this.selectedUser);
  
    // Open the modal for editing a user
    this.commonService.openModal('useraddedit');
  }
  

  delete(row: any) {
    // Handle delete operation
  }
  editSelectedUser() {
    console.log(this.selectedUser);
    this.userService.addedit(this.selectedUser).subscribe(
      (selectedUser) => {
        // Handle success
        this.getList();
        this.commonService.hideModal('useraddedit');
      },
      (error) => {
        // Handle error
        console.error('An error occurred:', error);
        // Optionally, handle error UI or notify user
      }
    );
  }
  
  private loadPeople3() {
    console.log('loadin callaed');
    this.custTypeahead.pipe(
        tap(() => this.custLoading = true),
        distinctUntilChanged(),
        debounceTime(200),
        switchMap(term => this.roleService.search(term)),
    ).subscribe(x => {
        this.roles = x;
        this.custLoading = false;
        this.cd.markForCheck();
    }, () => {
        this.roles = [];
    });
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

  getData(){ 
    let tr: any[]=[];
    this.userService.list().subscribe(
      res => { 
        for(let i in res){
          tr.push(res[i].region);
        }   
        this.users=tr; 
      }
    );

    this.roleService.list().subscribe(
      res => {       
        this.roles=res; 
      }
    );

    this.branchService.list().subscribe(
      res => {       
        this.branches=res; 
      }
    );
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
    swal.fire({
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
    }).then((result) => {
      if (result.value) {
        swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
      } else if (result.dismiss) {
        swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        );
      }
    });
  }
  updateFilter(event: Event) {
    const targetValue = (event.target as HTMLInputElement)?.value;
    if (targetValue !== undefined) {
      const val = targetValue.toLowerCase();
      const temp = this.tempFilter.filter((d: any) =>
        d.name.toLowerCase().indexOf(val) !== -1 ||
        d.id.toLowerCase().indexOf(val) !== -1 ||
        !val
      );
      this.tabrows = temp;
      this.table.offset = 0;
    }
  }
  
  gotounfreezuser(userdata: { email: string; id: any; }) {
    let that = this;
    swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to Unfreeze this user  ' + userdata.email,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: 'gray',
      confirmButtonText: 'Approve',
      cancelButtonText: 'Reject',
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-secondary'
      },
      buttonsStyling: false
    }).then((result: any) => { // Adjusted parameter type to any
      if (result.value) {
        that.userService.defreezuser(userdata.id).subscribe(
          (data: any) => {
            that.commonService.notify('info', 'User Unfreeze Successfully');
            that.getfreezuserList();
          },
          (error: any) => {
            // Handle errors here
          }
        );
      } else if (result.dismiss) {
        this.commonService.showModal('defreezUser');
      }
    });
  }
  getfreezuserList(){
    this.userService.freezlist().subscribe(
      res => {
        this.frzrows=res; 
        console.log(this.frzrows , 'this.frzrows');
      }
    );
  }

  childRegionList(){
    console.log("c r ",this.selectedUser.region);
    if(this.selectedUser.region.length > 0){
      this.userService.getchildregion(this.selectedUser.region).subscribe(
         res => {
            if(res.length>0){
              this.childregions = res;
            }  
         }
      );
    } 
  }
}
