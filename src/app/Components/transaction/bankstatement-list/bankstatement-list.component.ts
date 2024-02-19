// import {Component, OnInit, ViewChild} from '@angular/core';
// import {DatatableComponent} from '@swimlane/ngx-datatable';
// import swal from 'sweetalert2';
// import Swal from 'sweetalert2';
// import { AuthService } from '../../../Services/auth.service';
// import { CommonService } from '../../../Services/common.service';
// import { TransactionService } from '../../../Services/transaction.service';
// @Component({
//   selector: 'app-bankstatement-list',
//   templateUrl: './bankstatement-list.component.html',
//   styleUrls: [
//     './bankstatement-list.component.scss',
//     '../../../../assets/icon/icofont/css/icofont.scss'
//   ]
// })
// export class BankstatementListComponent implements OnInit {
//   rowsBasic = [];
//   fullScreenRow = [];
//   loadingIndicator = true;
//   reorderable = true;
//   roflag=false;

// loading=false;
//   rows = [];
//   tabrows = [];
//   expanded = {};
//   timeout: any;
//   rowsFilter = [];
//   tempFilter = [];

//   searchq='';
// searchqf='';
//   page = {
//     limit: 10,
//     count: 0,
//     offset: 0,
//     orderBy: 'id',
//     orderDir: 'desc'
//   };

//   selectedTransaction: any={};

//   @ViewChild(DatatableComponent) table!: DatatableComponent;

//   constructor(public authService:AuthService,public commonService:CommonService,public transactionService: TransactionService) {


//     /*this.fetchBasicData((data) => {
//       this.rowsBasic = data;
//       setTimeout(() => { this.loadingIndicator = false; }, 1500);
//     });

//     this.fetch((data) => {
//       this.rows = data;
//     });

//     this.fetchFullScreenData((data) => {
//       this.fullScreenRow = data;
//     });

//     this.fetchFilterData((data) => {
//       // cache our list
//       this.tempFilter = [...data];

//       // push our inital complete list
//       this.rowsFilter = data;
//     });*/

//   //  this.getList();
//   }

//   pageCallback(pageInfo: { count?: number, pageSize?: number, limit?: number, offset?: number }) {
//     this.page.offset = pageInfo.offset ?? this.page.offset; // Use optional chaining to handle undefined offset
//     this.getList();
//   }
  

//   filterq(cat_type: string){ 
//     if(cat_type !=='all'){
//     this.searchqf=cat_type; 
//     } else {
//       this.searchqf='';
//     }

//     this.search();
//   }
//   // getCustomers
//   getList(){
  
//     let params="pageoffset="+this.page.offset;
//     params=params+'&limit='+this.page.limit;
    
//   if(this.searchq.length>1){
//       params=params+'&searchq='+this.searchq;
//   }
//   if(this.searchqf.length>0){
//     params=params+'&searchqf='+this.searchqf;
// }

//     this.loadingIndicator=true;

//    this.loading=true;
//     this.transactionService.listbankstatement(params).subscribe(
// 			res => {
//         this.loading=false; 
//         this.page.count = res.count;
//       this.tabrows=res.rows;  
//       this.tempFilter = res;
//      this.loadingIndicator=false;


     
// 			}
//     );
//   }

//   view(row: any) {
// console.log(row);
//   }
//   edit(row: any) {

//   }
//   delete(row: any) {
//   }
//   add() {

//   }

  
//   ngOnInit() {
//     this.pageCallback({ offset: 0 });
//   }

//   search(){
//     this.pageCallback({ offset: 0 });
//   }

//   fetchBasicData(cb: (arg0: any) => void) {
//     const req = new XMLHttpRequest();
//     req.open('GET', 'assets/data/basic.json');

//     req.onload = () => {
//       cb(JSON.parse(req.response));
//     };

//     req.send();
//   }

//   fetchFullScreenData(cb: (arg0: any) => void) {
//     const req = new XMLHttpRequest();
//     req.open('GET', 'assets/data/fullscreen.json');

//     req.onload = () => {
//       cb(JSON.parse(req.response));
//     };

//     req.send();
//   }

//   fetchFilterData(cb: (arg0: any) => void) {
//     const req = new XMLHttpRequest();
//     req.open('GET', `assets/data/company.json`);

//     req.onload = () => {
//       cb(JSON.parse(req.response));
//     };

//     req.send();
//   }


//   // updateFilter(event: { target: { value: string; }; }) {
//   //   console.log('called');
//   //   let tempf =this.tempFilter;
//   //   const val = event.target.value.toLowerCase();
   
//   //   // filter our data
//   //   const temp = tempf.filter(function(d) {
//   //     return d.id.indexOf(val) !== -1 || d.quotation_id.indexOf(val) !== -1 || !val;
//   //   });

//   //   // update the rows
//   //   this.tabrows = temp;
//   //   // Whenever the filter changes, always go back to the first page
//   //   this.table.offset = 0;
//   // }

//   onPage(event: any) {
//     clearTimeout(this.timeout);
//     this.timeout = setTimeout(() => {
//       console.log('paged!', event);
//     }, 100);
//   }

//   fetch(cb: (arg0: any) => void) {
//     const req = new XMLHttpRequest();
//     req.open('GET', `assets/data/100k.json`);

//     req.onload = () => {
//       const rows = JSON.parse(req.response);

//       for (const row of rows) {
//         row.height = Math.floor(Math.random() * 80) + 50;
//       }

//       cb(rows);
//     };
//     req.send();
//   }

//   getRowHeight(row: { height: any; }) {
//     return row.height;
//   }


//   onFileChange(event: any) {
//     this.commonService.notify('info', 'Please Wait, Reco in Progress...');
//     if (this.loading) {
//       return; // Remove the return statement
//     }
  
//     let reader = new FileReader();
//     let fi = event.target.files[0];
//     reader.readAsDataURL(fi);
//     reader.onload = () => {
//       this.loading = true;
//       this.transactionService.uploadfileandrunreco(fi)
//         .subscribe(
//           data => {
//             this.loading = false;
//             // this.getList();
//             this.search();
//             this.commonService.notify('info', data.updated_transactions + ' Transactions Updated');
//           },
//           error => {
//             // this.alertService.error(error);
//             // this.loading = false;
//           });
//     };
//   }
  
//     runReco() {
//       this.commonService.notify('info', 'Please Wait, Reco in Progress...');
//       if (this.loading) {
//         return 0;
//       }
//       this.loading = true;
//       this.transactionService.runreco()
//         .subscribe(
//           data => {
//             this.loading = false;
//             this.commonService.notify('info', data.updated_transactions + ' Transactions Updated');
//             // this.getList();
//             this.search();
//           },
//           error => {
//             // this.alertService.error(error);
//             // this.loading = false;
//           });
    
//       // Return undefined explicitly if control reaches here
//       return undefined;
//     }
    

//     /*addEditTransaction(){
 
//        console.log(this.selectedTransaction);
    
      
    
//        this.transactionService.addedit(this.selectedTransaction)
//        .subscribe(
//            data => {
//              this.commonService.notify('info', 'Transaction Added/Updated Successfully');
//              this.commonService.hideModal('modaladdedittransaction'); 
            
//             },
//            error => { 
//            });
    
//     } */

//     deleteBankstatement(bs: { id: any; deleted: number; }) {
//       let params = { id: bs.id };
    
//       let that = this;
//       Swal.fire({ // Use Swal.fire() method
//         title: 'Are you sure?',
//         text: "",
//         icon: 'warning', // Use icon instead of type
//         showCancelButton: true,
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'Yes, remove it!',
//         cancelButtonText: 'No, cancel!',
//         confirmButtonClass: 'btn btn-success',
//         cancelButtonClass: 'btn btn-danger',
//         buttonsStyling: false
//       }).then((result: any) => { 
    
//         // True Confirmation    
//         if (result.value) {
//           that.transactionService.deletebankstatement(params)
//             .subscribe(
//               data => {
//                 that.commonService.notify('info', 'Bank Statement Entry deleted Successfully');
//                 bs.deleted = 1;
//               },
//               error => {
//                 // Handle error
//               });
//         }
    
//       });
    
//     }

// }
