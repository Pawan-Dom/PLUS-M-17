import {Component, OnInit, ViewChild} from '@angular/core';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import { distinctUntilChanged, debounceTime, switchMap, tap } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { BranchService } from '../../../Services/branches.service';
import { CommonService } from '../../../Services/common.service';
import { AlertService } from '../../../Services/alert.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-branch-list',
  templateUrl: './branch-list.component.html',
  styleUrls: [
    './branch-list.component.scss',
    '../../../../assets/icon/icofont/css/icofont.scss'
  ]
})
export class BranchListComponent implements OnInit {
  rowsBasic = [];
  roflag=false;
  fullScreenRow = [];
  loadingIndicator = true;
  reorderable = true;
  branch : any={};
  region : any=[];
  model :any={}; 
  selectedBranch : any = {};
selectedRegion : any={};
  rows = [];
  tabrows = [];
  loading=false;
  expanded = {};
  timeout: any;
  rowsFilter = []; 
  tempFilter = []; 
  page = {
    limit: 7,
    count: 0,
    offset: 0,
    orderBy: 'id',
    orderDir: 'desc'
  };

  @ViewChild(DatatableComponent) table!: DatatableComponent;

  constructor(public branchService: BranchService, public commonService:CommonService,
     private alertService: AlertService) {
   
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

    this.getList();
  }

  // getCustomers
    getList(){
      let params="pageoffset="+this.page.offset;
    params=params+'&limit='+this.page.limit;
      let tr=[];
      this.loading=true;
      this.branchService.list().subscribe(
        res => {
          
             
        this.loading=false;
         //for(let i in res){
          // tr.push({id:res[i].id,name:res[i].name,city:res[i].city,state:res[i].state,pincode:res[i].pincode,region:res[i].region,phone:res[i].phone,fax:res[i].fax,created_at:res[i].created_at,updated_at:res[i].updated_at});
        //  tr.push({id:res[i].id,name:res[i].name,city:res[i].city,state:res[i].state,fax:res[i].fax});
       // }
        // console.log(tr);
      this.tabrows=res;  
      this.tempFilter=res;
     
			}
    );
  }

  view(row: any) {
   console.log(row);
  }
  delete(row: any) {
  }

  editBranch(row: any) {
    this.selectedBranch= row;
    console.log(this.selectedBranch.fax);
  }
  
  addEditbranch(){
     console.log(this.model);
    this.branchService.addeditbranch(this.model).subscribe(
      res => {
          this.model=res;

          this.getList();
          //this.commonService.hideModal('modaladd');
          // for(let i in res){
          //   tr.push({id:res[i].id,name:res[i].name,email:res[i].email,mobile:res[i].mobile,role:res[i].role.name,location:res[i].location});
          // }
          // console.log(tr);
          this.alertService.notify('info', 'Saved Successful'); 
      }
  );
   
  }

  
  ngOnInit() {

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
  
}
