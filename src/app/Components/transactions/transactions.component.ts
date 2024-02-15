// import { Component, OnDestroy, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
// import { DatatableComponent } from '@swimlane/ngx-datatable';
// import { Subject } from 'rxjs';
// import { tap, distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';
// import swal from 'sweetalert2';
// import { CommonService } from '../common.service';
// import { RoleService } from '../role.service';
// import { UserService } from '../user.service';
// import { BranchService } from '../branches.service';
// import { AuthService } from '../auth.service';
// import { CustomerService } from '../customer.service';
// import { AlertService } from '../alert.service';
// import { MasterService } from '../master.service';
// import { NgxDatatableModule } from '@swimlane/ngx-datatable';
// import { NgSelectModule } from '@ng-select/ng-select';


// @Component({
//   selector: 'app-transactions-list',
//   templateUrl: './transactions.component.html',
//   styleUrls: [
//     './transactions.component.scss',
//     '../../../../assets/icon/icofont/css/icofont.scss'
//   ],
//   changeDetection: ChangeDetectionStrategy.OnPush
// })
// export class TransactionsComponent implements OnInit, OnDestroy {
//   @ViewChild(DatatableComponent) table!: DatatableComponent;

//   rowsBasic: any[] = [];
//   roflag = false;
//   fullScreenRow: any[] = [];
//   loading = false;
//   loadingIndicator = true;
//   reorderable = true;
//   selectedUser: any = {};
//   selectedRole: any[] = [];
//   selectedRegion: any[] = [];
//   users: any[] = [];
//   region: any[] = [];
//   branches: any[] = [];
//   reportings: any[] = [];
//   regionalreportingrows: any[] = [];
//   rows: any[] = [];
//   tabrows: any[] = [];
//   expanded: any = {};
//   timeout: any;
//   rowsFilter: any[] = [];
//   tempFilter: any[] = [];
//   user: any = {};
//   frzrows: any[] = [];
//   custTypeaheadCity = new Subject<string>();
//   cityLoading = false;
//   cities: any[] = [];
//   region_ids: any[] = [];
//   custLoading = false;
//   custTypeahead = new Subject<string>();
//   roles: any[] = [];

//   constructor(public authService: AuthService, public userService: UserService, public branchService: BranchService, private cd: ChangeDetectorRef,
//     private alertService: AlertService, public customerService: CustomerService,
//     public commonService: CommonService, private roleService: RoleService,
//     public masterService: MasterService) {
   
//     this.getData();
//     this.motherRegion();
//     this.selectedRole = this.commonService.getCurrentRole();
//     this.selectedRegion = this.commonService.getCurrentRegion();
//     this.getfreezuserList();
//   }

//   ngOnInit() {
//     this.motherRegion();
//     this.loadPeople3();
//     this.loadCities();
//     this.getData();
//     this.getfreezuserList();
//   }

//   ngOnDestroy() {}

//   loadCities() {
//     this.custTypeaheadCity.pipe(
//       tap(() => this.cityLoading = true),
//       distinctUntilChanged(),
//       debounceTime(200),
//       switchMap(term => this.masterService.citysearch(term + '&state=all')),
//     ).subscribe(x => {
//       this.cities = x;
//       this.cityLoading = false;
//       this.cd.markForCheck();
//     }, () => {
//       this.cities = [];
//     });
//   }

//   motherRegion() {
//     this.userService.motherchildregion().subscribe(
//       (res: string[] | any[]) => {
//         if (res.length > 0) {
//           this.region_ids = res;
//         }
//       }
//     );
//   }

//   getData() {
//     this.userService.list().subscribe(
//       (res: any[]) => {
//         for (let i in res) {
//           this.users.push(res[i].region);
//         }
//       }
//     );

//     this.roleService.list().subscribe(
//       (res: any[]) => {
//         this.roles = res;
//       }
//     );

//     this.branchService.list().subscribe(
//       (res: any[]) => {
//         this.branches = res;
//       }
//     );
//   }

//   loadPeople3() {
//     this.custTypeahead.pipe(
//       tap(() => this.custLoading = true),
//       distinctUntilChanged(),
//       debounceTime(200),
//       switchMap(term => this.roleService.search(term)),
//     ).subscribe(x => {
//       this.roles = x;
//       this.custLoading = false;
//       this.cd.markForCheck();
//     }, () => {
//       this.roles = [];
//     });
//   }

//   updateFilter(event: { target: { value: string; }; }) {
//     const val = event.target.value.toLowerCase();
//     const temp = this.tempFilter.filter((d: any) => 
//       d.name.toLowerCase().indexOf(val) !== -1 || 
//       d.id.toLowerCase().indexOf(val) !== -1 || 
//       !val
//     );
//     this.tabrows = temp;
//     this.table.offset = 0;
//   }

//   openSuccessCancelSwal() {
//     swal.fire({
//       title: 'Are you sure?',
//       text: 'You not be able to revert this!',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!',
//       cancelButtonText: 'No, cancel!',
//       customClass: {
//         confirmButton: 'btn btn-success',
//         cancelButton: 'btn btn-danger mr-sm'
//       }
//     }).then((result) => {
//       if (result.value) {
//         swal.fire(
//           'Deleted!',
//           'Your file has been deleted.',
//           'success'
//         );
//       } else if (result.dismiss) {
//         swal.fire(
//           'Cancelled',
//           'Your imaginary file is safe :)',
//           'error'
//         );
//       }
//     });
//   }
  
  

//   getfreezuserList() {
//     this.userService.freezlist().subscribe(
//       (res: any[]) => {
//         this.frzrows = res;
//       }
//     );
//   }

//   gotounfreezuser(userdata: { email: string; id: any; }) {
//     let that = this;
//     swal.fire({
//       title: 'Are you sure?',
//       text: 'Do you want to Unfreeze this user  ' + userdata.email,
//       icon: 'info',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: 'gray',
//       confirmButtonText: 'Approve',
//       cancelButtonText: 'Reject',
//       customClass: {
//         confirmButton: 'btn btn-success',
//         cancelButton: 'btn btn-secondary'
//       },
//       buttonsStyling: false
//     }).then((result: any) => { // Adjusted parameter type to any
//       if (result.value) {
//         that.userService.defreezuser(userdata.id).subscribe(
//           (data: any) => {
//             that.commonService.notify('info', 'User Unfreeze Successfully');
//             that.getfreezuserList();
//           },
//           (error: any) => {
//             // Handle errors here
//           }
//         );
//       } else if (result.dismiss) {
//         this.commonService.showModal('defreezUser');
//       }
//     });
//   }

//   view(row: any) {
//     console.log(row);
//    }
//    editUser(row: any) {
//      this.selectedUser= this.commonService.cloneWR(row);
//      console.log("Edit user",this.selectedUser);
//    }
//    delete(row: any) {
//    }
 
   
 
//    editSelectedUser(){
//     console.log(this.selectedUser);
//      this.userService.addEdit(this.selectedUser).subscribe(selectedUser =>{
//        this.alertService.notify('info', 'Saved Successful');
//        // this.getList();
//        this.commonService.hideModal('useraddedit');
//      });
 
//    }
// }
