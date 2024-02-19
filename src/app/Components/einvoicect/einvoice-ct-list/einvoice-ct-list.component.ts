import { Component, OnInit, ViewChild, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { HttpClient, HttpParams } from '@angular/common/http';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { distinctUntilChanged, debounceTime, switchMap, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthService } from '../../../Services/auth.service';
import { UserService } from '../../../Services/user.service';
import { CommonService } from '../../../Services/common.service';
import { EinvoicectService } from '../../../Services/einvoicect.service';
@Component({
  selector: 'app-einvoice-ct-list',
  templateUrl: './einvoice-ct-list.component.html',
  styleUrls: [
    './einvoice-ct-list.component.scss',
    '../../../../assets/icon/icofont/css/icofont.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class EinvoiceCtListComponent implements OnInit {
  rowsBasic = [];
  fullScreenRow = [];
  loadingIndicator = false;
  aceptreject = false;
  reorderable = true;
  rows = [];
  model: any = {};
  tabrows = [];
  timeout: any;
  rowsFilter = [];
  tempFilter = [];
  qd: any = [];
  searchq!: string;
 
  page: any = {
    limit: 7,
    count: 0,
    offset: 0,

    orderBy: 'id',
    orderDir: 'desc'
  };
  currentUser: any;
 
  searchqlimit = '7';
  roflag = false;
  searchqtyp! :string;
  searchqstatus!:string;


  @ViewChild(DatatableComponent) table!: DatatableComponent;
  constructor(public authService: AuthService, public userService: UserService, public route: ActivatedRoute, public commonService: CommonService, public einvoicectService: EinvoicectService, public router: Router, protected sanitizer: DomSanitizer, private cd: ChangeDetectorRef) {
    this.searchqlimit = '7';
    this.currentUser = this.commonService.getCurrentUser();
    this.pageCallback({ offset: 0 });
  }

 

  pageCallback(pageInfo: { count?: number, pageSize?: number, limit?: number, offset?: number }) {
    this.page.offset = pageInfo.offset;
    this.getList();
  }



  // get Einvoice CT list
  getList() {
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
    if (this.searchqtyp) { params = params + '&searchqtyp=' + this.searchqtyp; }
    if (this.searchqstatus) { params = params + '&searchqstatus=' + this.searchqstatus; }
    console.log('Einvoice CT params',params);
    this.loadingIndicator = true;
    this.einvoicectService.list(params).subscribe(
      res => {
        console.log('e-invoice CT list',res);
        this.page.count = res.count;
        // this.page.approver_user = res.approver_user;
        // this.page.reporting_user = res.reporting_user;
        this.tabrows = res.rows;
        this.tempFilter = res;
        this.loadingIndicator = false;
      }
    );
  }

  
  ngOnInit() {
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


 
  getInt(n: string) {
    return parseInt(n);
  }

  filterq(cat_type: any) {
    this.search();
  }


 





}
