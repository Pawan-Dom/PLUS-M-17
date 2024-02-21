import {Component, OnInit, ViewChild} from '@angular/core';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import { distinctUntilChanged, debounceTime, switchMap, tap } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { AlertService } from '../../../Services/alert.service';
import { CommonService } from '../../../Services/common.service';
import { AuthService } from '../../../Services/auth.service';
import { MasterService } from '../../../Services/master.service';
import { QuotationService } from '../../../Services/quotation.service';
import { LeadService } from '../../../Services/lead.service';

@Component({
  selector: 'app-lead-list',
  templateUrl: './lead-list.component.html',
  styleUrls: ['./lead-list.component.scss',
  '../../../../assets/icon/icofont/css/icofont.scss'
]
})
export class LeadListComponent implements OnInit {
  rowsBasic = [];
  roflag=false;
  roflag1=false;
loading=false;
  fullScreenRow = [];
  loadingIndicator = true;
  reorderable = true;
  model:any={};
  row : any= []; 
  currentUser:any;
  searchq='';
searchqf='';
  page = {
    limit: 7,
    count: 0,
    offset: 0,
    orderBy: 'id',
    orderDir: 'desc'
  };
  tabrows!: [];
  tempFilter :any ;

  constructor(
    private alertService: AlertService,
    public commonService:CommonService,
    public authService:AuthService,
    public quotationService: QuotationService,
    public masterService:MasterService,
    public leadService:LeadService
  ) { 

    this.currentUser=this.commonService.getCurrentUser();
  }

  ngOnInit() {
    this.pageCallback({ offset: 0 });
  }

  search(){
    this.pageCallback({ offset: 0 });
  }


  pageCallback(pageInfo: { count?: number, pageSize?: number, limit?: number, offset?: number }) {
    this.page.offset = pageInfo.offset ?? 0; // Default value of 0 if pageInfo.offset is undefined
    this.getList();
}


  filterq(cat_type: any){ 
  

    this.search();
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
    this.leadService.list(params).subscribe(
			res => {
        this.loading=false; 
        this.page.count = res.count;
      this.tabrows=res.rows;  
          console.log(this.tabrows);
      this.tempFilter = res;
     this.loadingIndicator=false;

     
			}
    );
  }

}
